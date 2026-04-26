import { useEffect, useMemo, useState } from 'react';
import {
  Badge,
  Button,
  Card,
  Checkbox,
  Input,
  LoadingGrid,
  Metrics,
  RadioGroup,
  Select,
  SideNav,
  Switch,
  Tabs,
  Textarea,
} from '../../components/index.js';
import './PlaygroundPage.css';

const STORAGE_KEY = 'nos-playground-state-v2';
const LOADING_LAB_STORAGE_KEY = 'nos-loading-lab-state-v1';

const ICON_OPTIONS = [
  { value: 'none', label: 'None' },
  { value: 'plus', label: 'Plus' },
  { value: 'search', label: 'Search' },
  { value: 'spark', label: 'Spark' },
  { value: 'arrow-right', label: 'Arrow Right' },
  { value: 'home', label: 'Home' },
  { value: 'calendar', label: 'Calendar' },
  { value: 'clock', label: 'Clock' },
  { value: 'sun', label: 'Sun' },
  { value: 'dollar', label: 'Dollar' },
  { value: 'phone', label: 'Phone' },
];

const COMPONENT_ORDER = [
  'Button',
  'Input',
  'Select',
  'Textarea',
  'Checkbox',
  'RadioGroup',
  'Switch',
  'Tabs',
  'Card',
  'Badge',
  'Metrics',
  'SideNav',
];

const LOADING_GRID_PATTERN_OPTIONS = ['scatter', 'wave', 'ripple', 'scan'];
const LOADING_GRID_SPEED_OPTIONS = ['slow', 'normal', 'fast'];
const LOADING_GRID_DENSITY_OPTIONS = ['sparse', 'balanced', 'dense'];
const LOADING_GRID_ACCENT_OPTIONS = ['low', 'medium', 'high'];
const LOADING_GRID_CELL_OPTIONS = ['sm', 'md', 'lg'];
const LOADING_GRID_GAP_OPTIONS = ['xs', 'sm', 'md'];
const LOADING_GRID_VARIANT_OPTIONS = [
  { value: 'light', label: 'Light' },
  { value: 'inverse', label: 'Inverse' },
];
const LOADING_GRID_SIZE_OPTIONS = [
  { value: '4', label: '4 x 4' },
  { value: '5', label: '5 x 5' },
  { value: '6', label: '6 x 6' },
];

const field = {
  text: (key, label) => ({ key, label, type: 'text' }),
  textarea: (key, label) => ({ key, label, type: 'textarea' }),
  toggle: (key, label) => ({ key, label, type: 'toggle' }),
  select: (key, label, options) => ({
    key,
    label,
    type: 'select',
    options: options.map((option) => (
      typeof option === 'string' ? { value: option, label: option } : option
    )),
  }),
  list: (key, label, fields, createItem) => ({
    key,
    label,
    type: 'list',
    fields,
    createItem,
    itemTitle: (item, index) => item.label || item.value || `Item ${index + 1}`,
  }),
};

const DEFAULT_COMPONENT_PROPS = {
  Button: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    label: 'Button',
    leadingIcon: false,
    trailingIcon: false,
  },
  Input: {
    size: 'md',
    label: 'Label',
    placeholder: 'Placeholder…',
    helperText: 'Helpful guidance for the field.',
    error: '',
    disabled: false,
    value: '',
    leadingIcon: 'none',
    trailingIcon: 'none',
  },
  Select: {
    size: 'md',
    label: 'Label',
    placeholder: 'Choose an option',
    helperText: 'Pick the value used in the workflow.',
    error: '',
    disabled: false,
    value: 'option-1',
    options: [
      { label: 'Option one', value: 'option-1', disabled: false },
      { label: 'Option two', value: 'option-2', disabled: false },
      { label: 'Option three', value: 'option-3', disabled: false },
    ],
  },
  Textarea: {
    size: 'md',
    resize: 'vertical',
    label: 'Label',
    placeholder: 'Add context…',
    helperText: 'Visible to internal reviewers.',
    error: '',
    disabled: false,
    value: '',
  },
  Checkbox: {
    label: 'Include archived records',
    helperText: 'Archived records appear in exports only.',
    error: '',
    disabled: false,
    checked: false,
  },
  RadioGroup: {
    label: 'Approval path',
    helperText: '',
    error: '',
    orientation: 'vertical',
    disabled: false,
    value: 'manager',
    options: [
      { label: 'Manager review', value: 'manager', helperText: 'Routes to the direct manager.', disabled: false },
      { label: 'Finance review', value: 'finance', helperText: 'Routes to finance operations.', disabled: false },
      { label: 'Auto approve', value: 'auto', helperText: 'Applies only to low-risk changes.', disabled: false },
    ],
  },
  Switch: {
    label: 'Auto-approve guidance',
    helperText: 'Applies to low-risk guidance updates.',
    disabled: false,
    checked: true,
  },
  Tabs: {
    size: 'md',
    ariaLabel: 'Sections',
    value: 'overview',
    tabs: [
      { label: 'Overview', value: 'overview', content: 'High-signal summary of the current entity.', disabled: false },
      { label: 'Activity', value: 'activity', content: 'Recent changes, comments, and exports.', disabled: false },
      { label: 'Settings', value: 'settings', content: 'Configuration flags and defaults.', disabled: false },
    ],
  },
  Card: {
    variant: 'default',
    padding: 'md',
    interactive: false,
    showHeader: true,
    header: 'Card header',
    body: 'Card body content goes here.',
    showFooter: true,
    footerPrimary: 'Confirm',
    footerSecondary: 'Cancel',
  },
  Badge: {
    variant: 'neutral',
    size: 'md',
    dot: false,
    label: 'Badge',
  },
  Metrics: {
    title: 'Guidance Overview — April 2026',
    variant: 'default',
    items: [
      { label: 'True Capacity', value: '0.00', unit: 'hrs', trendDirection: 'none', trendLabel: '' },
      { label: 'Total Guidance', value: '115.00', unit: 'hrs', trendDirection: 'up', trendLabel: '+12%' },
      { label: 'Overdue', value: '3', unit: 'items', trendDirection: 'down', trendLabel: '-1' },
    ],
  },
  SideNav: {
    brand: 'nos',
    primaryLabel: '',
    secondaryLabel: 'Tools',
    activeItem: 'Home',
    footerName: 'Team Member',
    footerEmail: 'member@example.com',
    showFooterAction: true,
    mainItems: [
      { label: 'Home', icon: 'home' },
      { label: 'Guidance', icon: 'calendar' },
      { label: 'Time Entry', icon: 'clock' },
      { label: 'PTO', icon: 'sun' },
      { label: 'Expenses', icon: 'dollar' },
      { label: 'Meetings', icon: 'phone' },
    ],
    secondaryItems: [
      { label: 'CRM', icon: 'none' },
      { label: 'Demand Planning', icon: 'none' },
      { label: 'Project Management', icon: 'none' },
    ],
  },
};

const DEFAULT_LOADING_GRID_PROPS = {
  pattern: 'scatter',
  gridSize: '5',
  speed: 'normal',
  density: 'balanced',
  accentRatio: 'medium',
  cellSize: 'md',
  gap: 'sm',
  variant: 'light',
  paused: false,
  decorative: false,
  label: 'Loading',
};

const LOADING_LAB_CONFIG = {
  sections: [
    {
      title: 'Pattern',
      fields: [
        field.select('pattern', 'Pattern', LOADING_GRID_PATTERN_OPTIONS),
        field.select('gridSize', 'Grid size', LOADING_GRID_SIZE_OPTIONS),
        field.select('density', 'Density', LOADING_GRID_DENSITY_OPTIONS),
        field.select('accentRatio', 'Accent ratio', LOADING_GRID_ACCENT_OPTIONS),
      ],
    },
    {
      title: 'Motion',
      fields: [
        field.select('speed', 'Speed', LOADING_GRID_SPEED_OPTIONS),
        field.toggle('paused', 'Paused'),
      ],
    },
    {
      title: 'Appearance',
      fields: [
        field.select('cellSize', 'Cell size', LOADING_GRID_CELL_OPTIONS),
        field.select('gap', 'Gap', LOADING_GRID_GAP_OPTIONS),
        field.select('variant', 'Theme', LOADING_GRID_VARIANT_OPTIONS),
      ],
    },
    {
      title: 'Accessibility',
      fields: [
        field.text('label', 'Accessible label'),
        field.toggle('decorative', 'Decorative'),
      ],
    },
  ],
};

const COMPONENT_CONFIG = {
  Button: {
    previewLayout: 'inline',
    sections: [
      {
        title: 'Props',
        fields: [
          field.select('variant', 'Variant', ['primary', 'secondary', 'ghost', 'danger', 'super']),
          field.select('size', 'Size', ['sm', 'md', 'lg']),
          field.text('label', 'Label'),
          field.toggle('leadingIcon', 'Leading icon'),
          field.toggle('trailingIcon', 'Trailing icon'),
          field.toggle('disabled', 'Disabled'),
          field.toggle('loading', 'Loading'),
        ],
      },
    ],
    normalize: (props) => props,
    renderPreview: (props) => (
      <Button
        variant={props.variant}
        size={props.size}
        disabled={props.disabled}
        loading={props.loading}
        leadingIcon={props.leadingIcon ? <IconPlus /> : undefined}
        trailingIcon={props.trailingIcon ? <IconArrowRight /> : undefined}
      >
        {props.label}
      </Button>
    ),
    buildJsx: (props) => buildButtonJsx(props),
  },
  Input: {
    previewLayout: 'field',
    sections: [
      {
        title: 'Props',
        fields: [
          field.select('size', 'Size', ['sm', 'md', 'lg']),
          field.text('label', 'Label'),
          field.text('value', 'Value'),
          field.text('placeholder', 'Placeholder'),
          field.text('helperText', 'Helper text'),
          field.text('error', 'Error text'),
          field.select('leadingIcon', 'Leading icon', iconValues()),
          field.select('trailingIcon', 'Trailing icon', iconValues()),
          field.toggle('disabled', 'Disabled'),
        ],
      },
    ],
    normalize: (props) => props,
    renderPreview: (props) => (
      <Input
        size={props.size}
        label={orUndefined(props.label)}
        value={props.value}
        placeholder={props.placeholder}
        helperText={orUndefined(props.helperText)}
        error={orUndefined(props.error)}
        disabled={props.disabled}
        leadingIcon={iconNode(props.leadingIcon)}
        trailingIcon={iconNode(props.trailingIcon)}
        onChange={noop}
      />
    ),
    buildJsx: (props) => buildInputJsx(props),
  },
  Select: {
    previewLayout: 'field',
    sections: [
      {
        title: 'Props',
        fields: [
          field.select('size', 'Size', ['sm', 'md', 'lg']),
          field.text('label', 'Label'),
          field.text('value', 'Selected value'),
          field.text('placeholder', 'Placeholder'),
          field.text('helperText', 'Helper text'),
          field.text('error', 'Error text'),
          field.toggle('disabled', 'Disabled'),
        ],
      },
      {
        title: 'Options',
        fields: [
          field.list('options', 'Options', [
            field.text('label', 'Label'),
            field.text('value', 'Value'),
            field.toggle('disabled', 'Disabled'),
          ], () => ({ label: 'New option', value: slugify('New option'), disabled: false })),
        ],
      },
    ],
    normalize: normalizeSelectProps,
    renderPreview: (props) => (
      <Select
        size={props.size}
        label={orUndefined(props.label)}
        value={props.value}
        placeholder={props.placeholder}
        helperText={orUndefined(props.helperText)}
        error={orUndefined(props.error)}
        disabled={props.disabled}
        options={props.options}
        onChange={noop}
      />
    ),
    buildJsx: (props) => buildSelectJsx(props),
  },
  Textarea: {
    previewLayout: 'field',
    sections: [
      {
        title: 'Props',
        fields: [
          field.select('size', 'Size', ['sm', 'md', 'lg']),
          field.select('resize', 'Resize', ['none', 'vertical']),
          field.text('label', 'Label'),
          field.textarea('value', 'Value'),
          field.text('placeholder', 'Placeholder'),
          field.text('helperText', 'Helper text'),
          field.text('error', 'Error text'),
          field.toggle('disabled', 'Disabled'),
        ],
      },
    ],
    normalize: (props) => props,
    renderPreview: (props) => (
      <Textarea
        size={props.size}
        resize={props.resize}
        label={orUndefined(props.label)}
        value={props.value}
        placeholder={props.placeholder}
        helperText={orUndefined(props.helperText)}
        error={orUndefined(props.error)}
        disabled={props.disabled}
        onChange={noop}
      />
    ),
    buildJsx: (props) => buildTextareaJsx(props),
  },
  Checkbox: {
    previewLayout: 'field',
    sections: [
      {
        title: 'Props',
        fields: [
          field.text('label', 'Label'),
          field.text('helperText', 'Helper text'),
          field.text('error', 'Error text'),
          field.toggle('checked', 'Checked'),
          field.toggle('disabled', 'Disabled'),
        ],
      },
    ],
    normalize: (props) => props,
    renderPreview: (props) => (
      <Checkbox
        label={orUndefined(props.label)}
        helperText={orUndefined(props.helperText)}
        error={orUndefined(props.error)}
        checked={props.checked}
        disabled={props.disabled}
        onChange={noop}
      />
    ),
    buildJsx: (props) => buildCheckboxJsx(props),
  },
  RadioGroup: {
    previewLayout: 'field',
    sections: [
      {
        title: 'Props',
        fields: [
          field.text('label', 'Label'),
          field.text('helperText', 'Helper text'),
          field.text('error', 'Error text'),
          field.select('orientation', 'Orientation', ['vertical', 'horizontal']),
          field.text('value', 'Selected value'),
          field.toggle('disabled', 'Disabled'),
        ],
      },
      {
        title: 'Options',
        fields: [
          field.list('options', 'Options', [
            field.text('label', 'Label'),
            field.text('value', 'Value'),
            field.text('helperText', 'Helper text'),
            field.toggle('disabled', 'Disabled'),
          ], () => ({ label: 'New option', value: slugify('New option'), helperText: '', disabled: false })),
        ],
      },
    ],
    normalize: normalizeRadioGroupProps,
    renderPreview: (props) => (
      <RadioGroup
        label={orUndefined(props.label)}
        helperText={orUndefined(props.helperText)}
        error={orUndefined(props.error)}
        orientation={props.orientation}
        disabled={props.disabled}
        value={props.value}
        options={props.options}
        onChange={noop}
      />
    ),
    buildJsx: (props) => buildRadioGroupJsx(props),
  },
  Switch: {
    previewLayout: 'field',
    sections: [
      {
        title: 'Props',
        fields: [
          field.text('label', 'Label'),
          field.text('helperText', 'Helper text'),
          field.toggle('checked', 'Checked'),
          field.toggle('disabled', 'Disabled'),
        ],
      },
    ],
    normalize: (props) => props,
    renderPreview: (props) => (
      <Switch
        label={orUndefined(props.label)}
        helperText={orUndefined(props.helperText)}
        checked={props.checked}
        disabled={props.disabled}
        onChange={noop}
      />
    ),
    buildJsx: (props) => buildSwitchJsx(props),
  },
  Tabs: {
    previewLayout: 'module',
    sections: [
      {
        title: 'Props',
        fields: [
          field.select('size', 'Size', ['sm', 'md']),
          field.text('ariaLabel', 'Aria label'),
          field.text('value', 'Active tab value'),
        ],
      },
      {
        title: 'Tabs',
        fields: [
          field.list('tabs', 'Tabs', [
            field.text('label', 'Label'),
            field.text('value', 'Value'),
            field.textarea('content', 'Content'),
            field.toggle('disabled', 'Disabled'),
          ], () => ({ label: 'New tab', value: slugify('New tab'), content: 'Tab content', disabled: false })),
        ],
      },
    ],
    normalize: normalizeTabsProps,
    renderPreview: (props) => (
      <Tabs
        size={props.size}
        ariaLabel={props.ariaLabel}
        value={props.value}
        onValueChange={noop}
        tabs={props.tabs.map((tab) => ({
          label: tab.label,
          value: tab.value,
          disabled: tab.disabled,
          content: (
            <div className="wb-playground__panel-content">
              <div className="wb-playground__panel-title">{tab.label}</div>
              <div className="wb-playground__panel-text">{tab.content}</div>
            </div>
          ),
        }))}
      />
    ),
    buildJsx: (props) => buildTabsJsx(props),
  },
  Card: {
    previewLayout: 'card',
    sections: [
      {
        title: 'Props',
        fields: [
          field.select('variant', 'Variant', ['default', 'muted', 'outlined']),
          field.select('padding', 'Padding', ['none', 'sm', 'md', 'lg']),
          field.toggle('interactive', 'Interactive'),
          field.toggle('showHeader', 'Show header'),
          field.toggle('showFooter', 'Show footer'),
        ],
      },
      {
        title: 'Content',
        fields: [
          field.text('header', 'Header'),
          field.textarea('body', 'Body'),
          field.text('footerPrimary', 'Primary action'),
          field.text('footerSecondary', 'Secondary action'),
        ],
      },
    ],
    normalize: (props) => props,
    renderPreview: (props) => (
      <Card
        variant={props.variant}
        padding={props.padding}
        interactive={props.interactive}
        style={{ width: '100%', maxWidth: 'calc(var(--spacing-24) * 4)' }}
      >
        {props.showHeader && <Card.Header>{props.header}</Card.Header>}
        <Card.Body>{props.body}</Card.Body>
        {props.showFooter && (
          <Card.Footer>
            <Button variant="ghost" size="sm">{props.footerSecondary}</Button>
            <Button size="sm">{props.footerPrimary}</Button>
          </Card.Footer>
        )}
      </Card>
    ),
    buildJsx: (props) => buildCardJsx(props),
  },
  Badge: {
    previewLayout: 'inline',
    sections: [
      {
        title: 'Props',
        fields: [
          field.select('variant', 'Variant', ['neutral', 'brand', 'success', 'warning', 'error', 'info']),
          field.select('size', 'Size', ['sm', 'md']),
          field.text('label', 'Label'),
          field.toggle('dot', 'Status dot'),
        ],
      },
    ],
    normalize: (props) => props,
    renderPreview: (props) => (
      <Badge variant={props.variant} size={props.size} dot={props.dot}>
        {props.label}
      </Badge>
    ),
    buildJsx: (props) => buildBadgeJsx(props),
  },
  Metrics: {
    previewLayout: 'module',
    sections: [
      {
        title: 'Props',
        fields: [
          field.text('title', 'Title'),
          field.select('variant', 'Variant', ['default', 'featured']),
        ],
      },
      {
        title: 'Items',
        fields: [
          field.list('items', 'Metrics', [
            field.text('label', 'Label'),
            field.text('value', 'Value'),
            field.text('unit', 'Unit'),
            field.select('trendDirection', 'Trend direction', ['none', 'up', 'down']),
            field.text('trendLabel', 'Trend label'),
          ], () => ({ label: 'New metric', value: '0', unit: '', trendDirection: 'none', trendLabel: '' })),
        ],
      },
    ],
    normalize: (props) => props,
    renderPreview: (props) => (
      <Metrics
        title={orUndefined(props.title)}
        variant={props.variant}
        items={props.items.map((item) => ({
          label: item.label,
          value: item.value,
          unit: item.unit,
          trend: item.trendDirection === 'none'
            ? undefined
            : { direction: item.trendDirection, label: item.trendLabel || 'Change' },
        }))}
      />
    ),
    buildJsx: (props) => buildMetricsJsx(props),
  },
  SideNav: {
    previewLayout: 'sidenav',
    sections: [
      {
        title: 'Props',
        fields: [
          field.text('brand', 'Brand'),
          field.text('primaryLabel', 'Primary section label'),
          field.text('secondaryLabel', 'Secondary section label'),
          field.text('activeItem', 'Active item'),
          field.text('footerName', 'Footer name'),
          field.text('footerEmail', 'Footer email'),
          field.toggle('showFooterAction', 'Footer action'),
        ],
      },
      {
        title: 'Main items',
        fields: [
          field.list('mainItems', 'Main items', [
            field.text('label', 'Label'),
            field.select('icon', 'Icon', iconValues()),
          ], () => ({ label: 'New item', icon: 'none' })),
        ],
      },
      {
        title: 'Secondary items',
        fields: [
          field.list('secondaryItems', 'Secondary items', [
            field.text('label', 'Label'),
            field.select('icon', 'Icon', iconValues()),
          ], () => ({ label: 'New item', icon: 'none' })),
        ],
      },
    ],
    normalize: normalizeSideNavProps,
    renderPreview: (props) => (
      <SideNav className="wb-playground__sidenav-frame" style={{ minHeight: '100%', height: '100%' }}>
        <SideNav.Header logo={<NymblMark />} brand={props.brand} />
        <SideNav.Section label={orUndefined(props.primaryLabel)}>
          {props.mainItems.map((item) => (
            <SideNav.Item
              key={`main-${item.label}`}
              icon={iconNode(item.icon)}
              active={props.activeItem === item.label}
            >
              {item.label}
            </SideNav.Item>
          ))}
        </SideNav.Section>
        <SideNav.Section divider label={orUndefined(props.secondaryLabel)}>
          {props.secondaryItems.map((item) => (
            <SideNav.Item
              key={`secondary-${item.label}`}
              icon={iconNode(item.icon)}
              active={props.activeItem === item.label}
            >
              {item.label}
            </SideNav.Item>
          ))}
        </SideNav.Section>
        <SideNav.Footer
          name={orUndefined(props.footerName)}
          email={orUndefined(props.footerEmail)}
          onAction={props.showFooterAction ? noop : undefined}
        />
      </SideNav>
    ),
    buildJsx: (props) => buildSideNavJsx(props),
  },
};

const DEFAULT_PLAYGROUND_STATE = {
  selectedComponent: COMPONENT_ORDER[0],
  componentPropsByName: DEFAULT_COMPONENT_PROPS,
};

/**
 * PlaygroundPage — workspace for component props and focused component labs.
 */
export function PlaygroundPage({ playgroundView = 'components' }) {
  if (playgroundView === 'loading') {
    return <LoadingLab />;
  }

  return <ComponentPlayground />;
}

/**
 * ComponentPlayground — interactive prop editor with live preview and generated JSX.
 */
function ComponentPlayground() {
  const [playgroundState, setPlaygroundState] = useState(loadInitialState);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(playgroundState));
  }, [playgroundState]);

  const componentName = playgroundState.selectedComponent;
  const config = COMPONENT_CONFIG[componentName];
  const props = playgroundState.componentPropsByName[componentName];
  const jsxString = useMemo(() => config.buildJsx(props), [config, props]);

  const setSelectedComponent = (nextName) => {
    setPlaygroundState((current) => ({
      ...current,
      selectedComponent: nextName,
    }));
  };

  const updateCurrentProps = (updater) => {
    setPlaygroundState((current) => {
      const previousProps = current.componentPropsByName[componentName];
      const nextProps = typeof updater === 'function' ? updater(previousProps) : updater;
      const normalizedProps = normalizeComponentProps(componentName, nextProps);

      return {
        ...current,
        componentPropsByName: {
          ...current.componentPropsByName,
          [componentName]: normalizedProps,
        },
      };
    });
  };

  return (
    <div className="wb-page wb-page--playground">
      <div className="wb-page__header">
        <div className="wb-page__eyebrow">Playground</div>
        <h1 className="wb-page__title">Playground</h1>
        <p className="wb-page__subtitle">
          Adjust public props across the full component library. The preview and generated JSX stay in sync.
        </p>
      </div>

      <div className="wb-playground">
        <div className="wb-playground__controls">
          <ControlSection title="Component">
            <FieldControl
              field={field.select('component', 'Component', COMPONENT_ORDER)}
              value={componentName}
              onChange={setSelectedComponent}
            />
          </ControlSection>

          {config.sections.map((section) => (
            <ControlSection key={section.title} title={section.title}>
              {section.fields.map((control) => (
                <FieldControl
                  key={control.key}
                  field={control}
                  value={props[control.key]}
                  onChange={(value) => updateCurrentProps((currentProps) => ({
                    ...currentProps,
                    [control.key]: value,
                  }))}
                />
              ))}
            </ControlSection>
          ))}
        </div>

        <div className="wb-playground__right">
          <div className={`wb-playground__preview wb-playground__preview--${config.previewLayout}`}>
            {config.renderPreview(props)}
          </div>
          <CodePanel jsxString={jsxString} />
        </div>
      </div>
    </div>
  );
}

function LoadingLab() {
  const [loadingProps, setLoadingProps] = useState(loadInitialLoadingLabState);
  const jsxString = useMemo(() => buildLoadingGridJsx(loadingProps), [loadingProps]);

  useEffect(() => {
    window.localStorage.setItem(LOADING_LAB_STORAGE_KEY, JSON.stringify(loadingProps));
  }, [loadingProps]);

  const updateLoadingProps = (updater) => {
    setLoadingProps((current) => {
      const nextProps = typeof updater === 'function' ? updater(current) : updater;
      return normalizeLoadingGridProps(nextProps);
    });
  };

  return (
    <div className="wb-page wb-page--playground">
      <div className="wb-page__header">
        <div className="wb-page__eyebrow">Playground</div>
        <h1 className="wb-page__title">Loading Lab</h1>
        <p className="wb-page__subtitle">
          Tune the grid loader pattern, motion, density, and accessible output before handing JSX to app teams.
        </p>
      </div>

      <div className="wb-playground">
        <div className="wb-playground__controls">
          {LOADING_LAB_CONFIG.sections.map((section) => (
            <ControlSection key={section.title} title={section.title}>
              {section.fields.map((control) => (
                <FieldControl
                  key={control.key}
                  field={control}
                  value={loadingProps[control.key]}
                  onChange={(value) => updateLoadingProps((currentProps) => ({
                    ...currentProps,
                    [control.key]: value,
                  }))}
                />
              ))}
            </ControlSection>
          ))}
        </div>

        <div className="wb-playground__right">
          <div className="wb-playground__preview wb-playground__preview--loading">
            <LoadingGrid
              pattern={loadingProps.pattern}
              gridSize={Number(loadingProps.gridSize)}
              speed={loadingProps.speed}
              density={loadingProps.density}
              accentRatio={loadingProps.accentRatio}
              cellSize={loadingProps.cellSize}
              gap={loadingProps.gap}
              variant={loadingProps.variant}
              paused={loadingProps.paused}
              decorative={loadingProps.decorative}
              label={loadingProps.label}
            />
          </div>
          <CodePanel jsxString={jsxString} />
        </div>
      </div>
    </div>
  );
}

function ControlSection({ title, children }) {
  return (
    <section className="wb-playground__section">
      <div className="wb-playground__section-header">
        <div className="wb-playground__section-title">{title}</div>
      </div>
      <div className="wb-playground__section-body">{children}</div>
    </section>
  );
}

function FieldControl({ field, value, onChange }) {
  if (field.type === 'toggle') {
    return (
      <label className="wb-ctrl-row wb-ctrl-row--inline">
        <span className="wb-ctrl-label">{field.label}</span>
        <button
          type="button"
          className={`wb-toggle ${value ? 'wb-toggle--on' : ''}`}
          onClick={() => onChange(!value)}
          aria-pressed={value}
        >
          <span className="wb-toggle__thumb" />
        </button>
      </label>
    );
  }

  if (field.type === 'select') {
    return (
      <label className="wb-ctrl-row">
        <span className="wb-ctrl-label">{field.label}</span>
        <select
          className="wb-ctrl-input"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        >
          {field.options.map((option) => (
            <option key={option.value || option} value={option.value || option}>
              {option.label || option}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (field.type === 'textarea') {
    return (
      <label className="wb-ctrl-row">
        <span className="wb-ctrl-label">{field.label}</span>
        <textarea
          className="wb-ctrl-input wb-ctrl-input--textarea"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </label>
    );
  }

  if (field.type === 'list') {
    return (
      <ListEditor
        field={field}
        items={value}
        onChange={onChange}
      />
    );
  }

  return (
    <label className="wb-ctrl-row">
      <span className="wb-ctrl-label">{field.label}</span>
      <input
        className="wb-ctrl-input"
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function ListEditor({ field, items, onChange }) {
  return (
    <div className="wb-list-editor">
      <div className="wb-list-editor__header">
        <div className="wb-ctrl-label">{field.label}</div>
        <button
          type="button"
          className="wb-ctrl-action"
          onClick={() => onChange([...items, field.createItem()])}
        >
          Add item
        </button>
      </div>

      <div className="wb-list-editor__items">
        {items.map((item, index) => (
          <div key={`${field.key}-${index}`} className="wb-list-editor__item">
            <div className="wb-list-editor__item-header">
              <div className="wb-list-editor__item-title">{field.itemTitle(item, index)}</div>
              <button
                type="button"
                className="wb-ctrl-action wb-ctrl-action--danger"
                onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}
              >
                Remove
              </button>
            </div>

            <div className="wb-list-editor__item-fields">
              {field.fields.map((childField) => (
                <FieldControl
                  key={`${field.key}-${index}-${childField.key}`}
                  field={childField}
                  value={item[childField.key]}
                  onChange={(nextValue) => {
                    onChange(items.map((currentItem, itemIndex) => (
                      itemIndex === index
                        ? { ...currentItem, [childField.key]: nextValue }
                        : currentItem
                    )));
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CodePanel({ jsxString }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsxString).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="wb-code-panel">
      <div className="wb-code-panel__header">
        <span className="wb-code-panel__label">Generated JSX</span>
        <button type="button" className="wb-copy-btn" onClick={handleCopy}>
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="wb-code-panel__pre"><code>{jsxString}</code></pre>
    </div>
  );
}

function loadInitialState() {
  if (typeof window === 'undefined') {
    return deepClone(DEFAULT_PLAYGROUND_STATE);
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return deepClone(DEFAULT_PLAYGROUND_STATE);
  }

  try {
    const parsed = JSON.parse(raw);
    const nextState = {
      selectedComponent: COMPONENT_ORDER.includes(parsed.selectedComponent)
        ? parsed.selectedComponent
        : DEFAULT_PLAYGROUND_STATE.selectedComponent,
      componentPropsByName: {},
    };

    COMPONENT_ORDER.forEach((name) => {
      nextState.componentPropsByName[name] = normalizeComponentProps(
        name,
        mergeWithDefaults(DEFAULT_COMPONENT_PROPS[name], parsed.componentPropsByName?.[name]),
      );
    });

    return nextState;
  } catch {
    return deepClone(DEFAULT_PLAYGROUND_STATE);
  }
}

function loadInitialLoadingLabState() {
  if (typeof window === 'undefined') {
    return deepClone(DEFAULT_LOADING_GRID_PROPS);
  }

  const raw = window.localStorage.getItem(LOADING_LAB_STORAGE_KEY);
  if (!raw) {
    return deepClone(DEFAULT_LOADING_GRID_PROPS);
  }

  try {
    return normalizeLoadingGridProps(mergeWithDefaults(DEFAULT_LOADING_GRID_PROPS, JSON.parse(raw)));
  } catch {
    return deepClone(DEFAULT_LOADING_GRID_PROPS);
  }
}

function normalizeComponentProps(name, props) {
  return COMPONENT_CONFIG[name].normalize(props);
}

function normalizeLoadingGridProps(props) {
  return {
    pattern: optionFromList(props.pattern, LOADING_GRID_PATTERN_OPTIONS, DEFAULT_LOADING_GRID_PROPS.pattern),
    gridSize: optionFromList(String(props.gridSize), ['4', '5', '6'], DEFAULT_LOADING_GRID_PROPS.gridSize),
    speed: optionFromList(props.speed, LOADING_GRID_SPEED_OPTIONS, DEFAULT_LOADING_GRID_PROPS.speed),
    density: optionFromList(props.density, LOADING_GRID_DENSITY_OPTIONS, DEFAULT_LOADING_GRID_PROPS.density),
    accentRatio: optionFromList(props.accentRatio, LOADING_GRID_ACCENT_OPTIONS, DEFAULT_LOADING_GRID_PROPS.accentRatio),
    cellSize: optionFromList(props.cellSize, LOADING_GRID_CELL_OPTIONS, DEFAULT_LOADING_GRID_PROPS.cellSize),
    gap: optionFromList(props.gap, LOADING_GRID_GAP_OPTIONS, DEFAULT_LOADING_GRID_PROPS.gap),
    variant: optionFromList(props.variant, ['light', 'inverse'], DEFAULT_LOADING_GRID_PROPS.variant),
    paused: Boolean(props.paused),
    decorative: Boolean(props.decorative),
    label: props.label || DEFAULT_LOADING_GRID_PROPS.label,
  };
}

function optionFromList(value, options, defaultValue) {
  return options.includes(value) ? value : defaultValue;
}

function normalizeSelectProps(props) {
  const options = normalizeOptions(props.options);
  const values = options.filter((option) => !option.disabled).map((option) => option.value);
  const value = values.includes(props.value) ? props.value : (values[0] || '');
  return {
    ...props,
    options,
    value,
  };
}

function normalizeRadioGroupProps(props) {
  const options = normalizeOptions(props.options);
  const values = options.filter((option) => !option.disabled).map((option) => option.value);
  const value = values.includes(props.value) ? props.value : (values[0] || '');
  return {
    ...props,
    options,
    value,
  };
}

function normalizeTabsProps(props) {
  const tabs = props.tabs.map((tab, index) => ({
    ...tab,
    label: tab.label || `Tab ${index + 1}`,
    value: tab.value || `tab-${index + 1}`,
    content: tab.content || '',
  }));
  const values = tabs.filter((tab) => !tab.disabled).map((tab) => tab.value);
  return {
    ...props,
    tabs,
    value: values.includes(props.value) ? props.value : (values[0] || ''),
  };
}

function normalizeSideNavProps(props) {
  const mainItems = props.mainItems.map((item, index) => ({
    ...item,
    label: item.label || `Item ${index + 1}`,
    icon: item.icon || 'none',
  }));
  const secondaryItems = props.secondaryItems.map((item, index) => ({
    ...item,
    label: item.label || `Secondary ${index + 1}`,
    icon: item.icon || 'none',
  }));
  const allLabels = [...mainItems, ...secondaryItems].map((item) => item.label);
  const activeItem = allLabels.includes(props.activeItem) ? props.activeItem : (allLabels[0] || '');
  return {
    ...props,
    mainItems,
    secondaryItems,
    activeItem,
  };
}

function normalizeOptions(options) {
  return options.map((option, index) => ({
    ...option,
    label: option.label || `Option ${index + 1}`,
    value: option.value || `option-${index + 1}`,
  }));
}

function mergeWithDefaults(defaultValue, incomingValue) {
  if (Array.isArray(defaultValue)) {
    if (!Array.isArray(incomingValue)) {
      return deepClone(defaultValue);
    }

    if (!defaultValue.length) {
      return deepClone(incomingValue);
    }

    return incomingValue.map((item) => mergeWithDefaults(defaultValue[0], item));
  }

  if (defaultValue && typeof defaultValue === 'object') {
    const result = {};
    Object.keys(defaultValue).forEach((key) => {
      result[key] = mergeWithDefaults(defaultValue[key], incomingValue?.[key]);
    });
    return result;
  }

  if (typeof incomingValue === typeof defaultValue) {
    return incomingValue;
  }

  return defaultValue;
}

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function buildButtonJsx(props) {
  const attrs = propLines([
    stringProp('variant', props.variant, 'primary'),
    stringProp('size', props.size, 'md'),
    booleanProp('disabled', props.disabled),
    booleanProp('loading', props.loading),
    booleanIconProp('leadingIcon', props.leadingIcon, 'IconPlus'),
    booleanIconProp('trailingIcon', props.trailingIcon, 'IconArrowRight'),
  ]);
  return wrapJsx('Button', attrs, props.label);
}

function buildInputJsx(props) {
  const attrs = propLines([
    stringProp('size', props.size, 'md'),
    optionalStringProp('label', props.label),
    optionalStringProp('value', props.value),
    stringProp('placeholder', props.placeholder),
    optionalStringProp('helperText', props.helperText),
    optionalStringProp('error', props.error),
    booleanProp('disabled', props.disabled),
    iconProp('leadingIcon', props.leadingIcon),
    iconProp('trailingIcon', props.trailingIcon),
  ]);
  return selfClosingJsx('Input', attrs);
}

function buildSelectJsx(props) {
  const attrs = propLines([
    stringProp('size', props.size, 'md'),
    optionalStringProp('label', props.label),
    optionalStringProp('value', props.value),
    stringProp('placeholder', props.placeholder),
    optionalStringProp('helperText', props.helperText),
    optionalStringProp('error', props.error),
    booleanProp('disabled', props.disabled),
    objectProp('options', props.options.map((option) => ({
      label: option.label,
      value: option.value,
      ...(option.disabled ? { disabled: true } : {}),
    }))),
  ]);
  return selfClosingJsx('Select', attrs);
}

function buildTextareaJsx(props) {
  const attrs = propLines([
    stringProp('size', props.size, 'md'),
    stringProp('resize', props.resize, 'vertical'),
    optionalStringProp('label', props.label),
    optionalStringProp('value', props.value),
    stringProp('placeholder', props.placeholder),
    optionalStringProp('helperText', props.helperText),
    optionalStringProp('error', props.error),
    booleanProp('disabled', props.disabled),
  ]);
  return selfClosingJsx('Textarea', attrs);
}

function buildCheckboxJsx(props) {
  const attrs = propLines([
    optionalStringProp('label', props.label),
    optionalStringProp('helperText', props.helperText),
    optionalStringProp('error', props.error),
    booleanProp('checked', props.checked),
    booleanProp('disabled', props.disabled),
  ]);
  return selfClosingJsx('Checkbox', attrs);
}

function buildRadioGroupJsx(props) {
  const attrs = propLines([
    optionalStringProp('label', props.label),
    optionalStringProp('helperText', props.helperText),
    optionalStringProp('error', props.error),
    stringProp('orientation', props.orientation, 'vertical'),
    optionalStringProp('value', props.value),
    booleanProp('disabled', props.disabled),
    objectProp('options', props.options.map((option) => ({
      label: option.label,
      value: option.value,
      ...(option.helperText ? { helperText: option.helperText } : {}),
      ...(option.disabled ? { disabled: true } : {}),
    }))),
  ]);
  return selfClosingJsx('RadioGroup', attrs);
}

function buildSwitchJsx(props) {
  const attrs = propLines([
    optionalStringProp('label', props.label),
    optionalStringProp('helperText', props.helperText),
    booleanProp('checked', props.checked),
    booleanProp('disabled', props.disabled),
  ]);
  return selfClosingJsx('Switch', attrs);
}

function buildTabsJsx(props) {
  const attrs = propLines([
    stringProp('size', props.size, 'md'),
    stringProp('ariaLabel', props.ariaLabel, 'Tabs'),
    optionalStringProp('value', props.value),
    objectProp('tabs', props.tabs.map((tab) => ({
      label: tab.label,
      value: tab.value,
      content: `<div>${escapeJsxText(tab.content)}</div>`,
      ...(tab.disabled ? { disabled: true } : {}),
    })), { jsxContentKeys: ['content'] }),
  ]);
  return selfClosingJsx('Tabs', attrs);
}

function buildCardJsx(props) {
  const attrs = propLines([
    stringProp('variant', props.variant, 'default'),
    stringProp('padding', props.padding, 'md'),
    booleanProp('interactive', props.interactive),
  ]);

  const lines = [`<Card${attrs ? `\n${indentLines(attrs)}` : ''}>`];
  if (props.showHeader) {
    lines.push(`  <Card.Header>${escapeJsxText(props.header)}</Card.Header>`);
  }
  lines.push(`  <Card.Body>${escapeJsxText(props.body)}</Card.Body>`);
  if (props.showFooter) {
    lines.push('  <Card.Footer>');
    lines.push(`    <Button variant="ghost" size="sm">${escapeJsxText(props.footerSecondary)}</Button>`);
    lines.push(`    <Button size="sm">${escapeJsxText(props.footerPrimary)}</Button>`);
    lines.push('  </Card.Footer>');
  }
  lines.push('</Card>');
  return lines.join('\n');
}

function buildBadgeJsx(props) {
  const attrs = propLines([
    stringProp('variant', props.variant, 'neutral'),
    stringProp('size', props.size, 'md'),
    booleanProp('dot', props.dot),
  ]);
  return wrapJsx('Badge', attrs, props.label);
}

function buildLoadingGridJsx(props) {
  const attrs = propLines([
    stringProp('pattern', props.pattern, 'scatter'),
    numberProp('gridSize', props.gridSize, 5),
    stringProp('speed', props.speed, 'normal'),
    stringProp('density', props.density, 'balanced'),
    stringProp('accentRatio', props.accentRatio, 'medium'),
    stringProp('cellSize', props.cellSize, 'md'),
    stringProp('gap', props.gap, 'sm'),
    stringProp('variant', props.variant, 'light'),
    booleanProp('paused', props.paused),
    booleanProp('decorative', props.decorative),
    stringProp('label', props.label, 'Loading'),
  ]);
  return selfClosingJsx('LoadingGrid', attrs);
}

function buildMetricsJsx(props) {
  const attrs = propLines([
    optionalStringProp('title', props.title),
    stringProp('variant', props.variant, 'default'),
    objectProp('items', props.items.map((item) => ({
      label: item.label,
      value: item.value,
      ...(item.unit ? { unit: item.unit } : {}),
      ...(item.trendDirection !== 'none'
        ? { trend: { direction: item.trendDirection, label: item.trendLabel || 'Change' } }
        : {}),
    }))),
  ]);
  return selfClosingJsx('Metrics', attrs);
}

function buildSideNavJsx(props) {
  const lines = ['<SideNav>'];
  lines.push(`  <SideNav.Header logo={<NymblMark />} brand="${escapeAttribute(props.brand)}" />`);
  lines.push(`  <SideNav.Section${props.primaryLabel ? ` label="${escapeAttribute(props.primaryLabel)}"` : ''}>`);
  props.mainItems.forEach((item) => {
    lines.push(`    <SideNav.Item${item.icon !== 'none' ? ` icon={<${iconJsxName(item.icon)} />}` : ''}${props.activeItem === item.label ? ' active' : ''}>${escapeJsxText(item.label)}</SideNav.Item>`);
  });
  lines.push('  </SideNav.Section>');
  lines.push(`  <SideNav.Section divider${props.secondaryLabel ? ` label="${escapeAttribute(props.secondaryLabel)}"` : ''}>`);
  props.secondaryItems.forEach((item) => {
    lines.push(`    <SideNav.Item${item.icon !== 'none' ? ` icon={<${iconJsxName(item.icon)} />}` : ''}${props.activeItem === item.label ? ' active' : ''}>${escapeJsxText(item.label)}</SideNav.Item>`);
  });
  lines.push('  </SideNav.Section>');
  lines.push(`  <SideNav.Footer name="${escapeAttribute(props.footerName)}" email="${escapeAttribute(props.footerEmail)}"${props.showFooterAction ? ' onAction={() => {}}' : ''} />`);
  lines.push('</SideNav>');
  return lines.join('\n');
}

function propLines(entries) {
  return entries.filter(Boolean).join('\n');
}

function stringProp(name, value, defaultValue) {
  if (value === defaultValue) return '';
  return `${name}="${escapeAttribute(value)}"`;
}

function optionalStringProp(name, value) {
  if (!value) return '';
  return `${name}="${escapeAttribute(value)}"`;
}

function booleanProp(name, value) {
  return value ? name : '';
}

function numberProp(name, value, defaultValue) {
  const numericValue = Number(value);
  if (numericValue === defaultValue) return '';
  return `${name}={${numericValue}}`;
}

function iconProp(name, value) {
  if (!value || value === 'none') return '';
  return `${name}={<${iconJsxName(value)} />}`;
}

function booleanIconProp(name, on, iconName) {
  if (!on) return '';
  return `${name}={<${iconName} />}`;
}

function objectProp(name, value, options = {}) {
  return `${name}={${serializeJsValue(value, 0, options)}}`;
}

function selfClosingJsx(name, attrs) {
  if (!attrs) return `<${name} />`;
  return `<${name}\n${indentLines(attrs)}\n/>`;
}

function wrapJsx(name, attrs, children) {
  if (!attrs) return `<${name}>${escapeJsxText(children)}</${name}>`;
  return `<${name}\n${indentLines(attrs)}\n>${escapeJsxText(children)}</${name}>`;
}

function indentLines(value, level = 1) {
  const indent = '  '.repeat(level);
  return value.split('\n').map((line) => `${indent}${line}`).join('\n');
}

function serializeJsValue(value, indentLevel = 0, options = {}) {
  const indent = '  '.repeat(indentLevel);
  const nextIndent = '  '.repeat(indentLevel + 1);

  if (Array.isArray(value)) {
    if (!value.length) return '[]';
    const items = value.map((item) => `${nextIndent}${serializeJsValue(item, indentLevel + 1, options)}`);
    return `[\n${items.join(',\n')}\n${indent}]`;
  }

  if (value && typeof value === 'object') {
    const entries = Object.entries(value);
    if (!entries.length) return '{}';
    const lines = entries.map(([key, entryValue]) => {
      if (options.jsxContentKeys?.includes(key)) {
        return `${nextIndent}${key}: ${entryValue}`;
      }
      return `${nextIndent}${key}: ${serializeJsValue(entryValue, indentLevel + 1, options)}`;
    });
    return `{\n${lines.join(',\n')}\n${indent}}`;
  }

  if (typeof value === 'string') {
    return `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
  }

  return String(value);
}

function orUndefined(value) {
  return value ? value : undefined;
}

function escapeAttribute(value) {
  return String(value).replace(/"/g, '&quot;');
}

function escapeJsxText(value) {
  return String(value);
}

function slugify(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'item';
}

function noop() {}

function iconValues() {
  return ICON_OPTIONS;
}

function iconNode(name) {
  if (!name || name === 'none') return undefined;
  const icons = {
    plus: <IconPlus />,
    search: <IconSearch />,
    spark: <IconSpark />,
    'arrow-right': <IconArrowRight />,
    home: <IconHome />,
    calendar: <IconCalendar />,
    clock: <IconClock />,
    sun: <IconSun />,
    dollar: <IconDollar />,
    phone: <IconPhone />,
  };
  return icons[name];
}

function iconJsxName(name) {
  const names = {
    plus: 'IconPlus',
    search: 'IconSearch',
    spark: 'IconSpark',
    'arrow-right': 'IconArrowRight',
    home: 'IconHome',
    calendar: 'IconCalendar',
    clock: 'IconClock',
    sun: 'IconSun',
    dollar: 'IconDollar',
    phone: 'IconPhone',
  };
  return names[name];
}

function NymblMark() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12,2 22,8 22,16 12,22 2,16 2,8" />
      <polyline points="12,2 12,22" />
      <line x1="2" y1="8" x2="22" y2="8" />
      <line x1="2" y1="16" x2="22" y2="16" />
    </svg>
  );
}

function IconPlus() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M8 3v10M3 8h10" />
    </svg>
  );
}

function IconSearch() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7" cy="7" r="4.5" />
      <path d="M10.5 10.5L13.5 13.5" />
    </svg>
  );
}

function IconSpark() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2l1.2 3.3L12.5 6.5l-3.3 1.2L8 11 6.8 7.7 3.5 6.5l3.3-1.2L8 2z" />
    </svg>
  );
}

function IconArrowRight() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h10" />
      <path d="M9 4l4 4-4 4" />
    </svg>
  );
}

function IconHome() {
  return (
    <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 7.5L9 2l7 5.5V16a1 1 0 01-1 1H3a1 1 0 01-1-1V7.5z" />
      <path d="M7 17V11h4v6" />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="14" height="14" rx="2" />
      <line x1="6" y1="1" x2="6" y2="5" />
      <line x1="12" y1="1" x2="12" y2="5" />
      <line x1="2" y1="8" x2="16" y2="8" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="9" r="7" />
      <polyline points="9,5 9,9 12,11" />
    </svg>
  );
}

function IconSun() {
  return (
    <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="9" r="3" />
      <line x1="9" y1="1" x2="9" y2="3" />
      <line x1="9" y1="15" x2="9" y2="17" />
      <line x1="1" y1="9" x2="3" y2="9" />
      <line x1="15" y1="9" x2="17" y2="9" />
      <line x1="3.2" y1="3.2" x2="4.6" y2="4.6" />
      <line x1="13.4" y1="13.4" x2="14.8" y2="14.8" />
      <line x1="14.8" y1="3.2" x2="13.4" y2="4.6" />
      <line x1="4.6" y1="13.4" x2="3.2" y2="14.8" />
    </svg>
  );
}

function IconDollar() {
  return (
    <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="9" y1="1" x2="9" y2="17" />
      <path d="M13 4H7a3 3 0 000 6h4a3 3 0 010 6H5" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2h3l1.5 4-2 1.2a10 10 0 004.3 4.3L11 9.5l4 1.5v3a1 1 0 01-1 1A15 15 0 012 3a1 1 0 011-1z" />
    </svg>
  );
}
