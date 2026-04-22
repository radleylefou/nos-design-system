import { useState } from 'react';
import { Button, Input, Card, Badge } from '../../components/index.js';
import './PlaygroundPage.css';

/**
 * PlaygroundPage — interactive prop editor with live preview and generated JSX.
 */
export function PlaygroundPage() {
  const [componentName, setComponentName] = useState('Button');
  const [props, setProps] = useState(DEFAULT_PROPS.Button);

  const handleComponentChange = (name) => {
    setComponentName(name);
    setProps(DEFAULT_PROPS[name]);
  };

  const setProp = (key, value) => setProps((prev) => ({ ...prev, [key]: value }));

  const jsxString = buildJsx(componentName, props);

  return (
    <div className="wb-page">
      <div className="wb-page__header">
        <div className="wb-page__eyebrow">Playground</div>
        <h1 className="wb-page__title">Playground</h1>
        <p className="wb-page__subtitle">
          Select a component and tweak its props. The preview and generated JSX update live.
        </p>
      </div>

      <div className="wb-playground">
        {/* Left: controls */}
        <div className="wb-playground__controls">
          <div className="wb-ctrl-group">
            <label className="wb-ctrl-label">Component</label>
            <select
              className="wb-ctrl-select"
              value={componentName}
              onChange={(e) => handleComponentChange(e.target.value)}
            >
              <option>Button</option>
              <option>Input</option>
              <option>Card</option>
            </select>
          </div>

          {CONTROLS[componentName].map((ctrl) => (
            <ControlField
              key={ctrl.key}
              ctrl={ctrl}
              value={props[ctrl.key]}
              onChange={(v) => setProp(ctrl.key, v)}
            />
          ))}
        </div>

        {/* Right: preview + code */}
        <div className="wb-playground__right">
          <div className="wb-playground__preview">
            <LivePreview componentName={componentName} props={props} />
          </div>
          <CodePanel jsxString={jsxString} />
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Control field renderer
// ---------------------------------------------------------------------------

function ControlField({ ctrl, value, onChange }) {
  if (ctrl.type === 'select') {
    return (
      <div className="wb-ctrl-group">
        <label className="wb-ctrl-label">{ctrl.label}</label>
        <select
          className="wb-ctrl-select"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {ctrl.options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>
    );
  }

  if (ctrl.type === 'toggle') {
    return (
      <div className="wb-ctrl-group wb-ctrl-group--inline">
        <label className="wb-ctrl-label">{ctrl.label}</label>
        <button
          type="button"
          className={`wb-toggle ${value ? 'wb-toggle--on' : ''}`}
          onClick={() => onChange(!value)}
          aria-pressed={value}
        >
          <span className="wb-toggle__thumb" />
        </button>
      </div>
    );
  }

  if (ctrl.type === 'text') {
    return (
      <div className="wb-ctrl-group">
        <label className="wb-ctrl-label">{ctrl.label}</label>
        <input
          className="wb-ctrl-input"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    );
  }

  return null;
}

// ---------------------------------------------------------------------------
// Live preview
// ---------------------------------------------------------------------------

function LivePreview({ componentName, props }) {
  if (componentName === 'Button') {
    return (
      <Button
        variant={props.variant}
        size={props.size}
        disabled={props.disabled}
        loading={props.loading}
      >
        {props.children}
      </Button>
    );
  }

  if (componentName === 'Input') {
    return (
      <div style={{ width: 300 }}>
        <Input
          label={props.label || undefined}
          placeholder={props.placeholder}
          size={props.size}
          disabled={props.disabled}
          error={props.error || undefined}
          helperText={props.helperText || undefined}
        />
      </div>
    );
  }

  if (componentName === 'Card') {
    return (
      <Card variant={props.variant} padding={props.padding} style={{ width: 280 }}>
        <Card.Header>Card header</Card.Header>
        <Card.Body>Card body content goes here.</Card.Body>
        <Card.Footer>
          <Button variant="ghost" size="sm">Cancel</Button>
          <Button size="sm">Confirm</Button>
        </Card.Footer>
      </Card>
    );
  }

  return null;
}

// ---------------------------------------------------------------------------
// Code panel
// ---------------------------------------------------------------------------

function CodePanel({ jsxString }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsxString).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="wb-code-panel">
      <div className="wb-code-panel__header">
        <span className="wb-code-panel__label">Generated JSX</span>
        <button type="button" className="wb-copy-btn" onClick={handleCopy}>
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <pre className="wb-code-panel__pre"><code>{jsxString}</code></pre>
    </div>
  );
}

// ---------------------------------------------------------------------------
// JSX generator
// ---------------------------------------------------------------------------

function buildJsx(name, props) {
  const attrs = Object.entries(props)
    .filter(([key, value]) => {
      if (key === 'children') return false;
      if (value === false || value === '' || value === null) return false;
      if (name === 'Button' && key === 'variant' && value === 'primary') return false;
      if (name === 'Button' && key === 'size' && value === 'md') return false;
      if (name === 'Input' && key === 'size' && value === 'md') return false;
      if (name === 'Card' && key === 'padding' && value === 'md') return false;
      if (name === 'Card' && key === 'variant' && value === 'default') return false;
      return true;
    })
    .map(([key, value]) => {
      if (value === true) return key;
      return `${key}="${value}"`;
    });

  const attrStr = attrs.length ? ' ' + attrs.join(' ') : '';

  if (name === 'Button') {
    return `<Button${attrStr}>${props.children}</Button>`;
  }

  if (name === 'Input') {
    return `<Input${attrStr} />`;
  }

  if (name === 'Card') {
    return `<Card${attrStr}>\n  <Card.Header>Card header</Card.Header>\n  <Card.Body>Card body content goes here.</Card.Body>\n  <Card.Footer>\n    <Button variant="ghost" size="sm">Cancel</Button>\n    <Button size="sm">Confirm</Button>\n  </Card.Footer>\n</Card>`;
  }

  return '';
}

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const DEFAULT_PROPS = {
  Button: { variant: 'primary', size: 'md', disabled: false, loading: false, children: 'Button' },
  Input:  { size: 'md', disabled: false, label: 'Label', placeholder: 'Placeholder…', error: '', helperText: '' },
  Card:   { variant: 'default', padding: 'md' },
};

const CONTROLS = {
  Button: [
    { key: 'variant',  label: 'Variant',  type: 'select',  options: ['primary', 'secondary', 'ghost', 'danger'] },
    { key: 'size',     label: 'Size',     type: 'select',  options: ['sm', 'md', 'lg'] },
    { key: 'children', label: 'Label',    type: 'text' },
    { key: 'disabled', label: 'Disabled', type: 'toggle' },
    { key: 'loading',  label: 'Loading',  type: 'toggle' },
  ],
  Input: [
    { key: 'size',        label: 'Size',        type: 'select', options: ['sm', 'md', 'lg'] },
    { key: 'label',       label: 'Label',       type: 'text' },
    { key: 'placeholder', label: 'Placeholder', type: 'text' },
    { key: 'helperText',  label: 'Helper text', type: 'text' },
    { key: 'error',       label: 'Error msg',   type: 'text' },
    { key: 'disabled',    label: 'Disabled',    type: 'toggle' },
  ],
  Card: [
    { key: 'variant', label: 'Variant', type: 'select', options: ['default', 'muted', 'outlined'] },
    { key: 'padding', label: 'Padding', type: 'select', options: ['none', 'sm', 'md', 'lg'] },
  ],
};
