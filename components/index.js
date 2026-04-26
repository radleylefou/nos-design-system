// Component registry.
// Every component in `components/` must be exported from here so downstream
// NOS apps and the workbench can import from a single entry point.

export { Button } from './Button.jsx';
export { Input } from './Input.jsx';
export { Select } from './Select.jsx';
export { Textarea } from './Textarea.jsx';
export { Checkbox } from './Checkbox.jsx';
export { RadioGroup } from './RadioGroup.jsx';
export { Switch } from './Switch.jsx';
export { Tabs } from './Tabs.jsx';
export { Card } from './Card.jsx';
export { Badge } from './Badge.jsx';
export { LoadingGrid } from './LoadingGrid.jsx';
export { Metrics } from './Metrics.jsx';
export { SideNav } from './SideNav.jsx';

// Data Display
export { Table } from './Table.jsx';
export { Avatar } from './Avatar.jsx';
export { ProgressBar, ProgressRing } from './Progress.jsx';
export { StatBlock } from './StatBlock.jsx';
export { Divider } from './Divider.jsx';

// Forms (extended)
export { DatePicker, DateRangePicker } from './DatePicker.jsx';
export { Combobox } from './Combobox.jsx';
export { TagInput } from './TagInput.jsx';
export { NumberInput } from './NumberInput.jsx';
export { FileUpload } from './FileUpload.jsx';
export { FieldGroup } from './FieldGroup.jsx';

// NOS domain primitives — Batch 5
export { StatusPill, STATUS_OPTIONS } from './StatusPill.jsx';
export { HierarchyTree } from './HierarchyTree.jsx';
export { RequirementList } from './RequirementList.jsx';
export { Timeline } from './Timeline.jsx';
export { CommentThread } from './CommentThread.jsx';
export { Stepper } from './Stepper.jsx';

// Polish & secondary — Batch 6
export { Popover } from './Popover.jsx';
export { Menu } from './Menu.jsx';
export { Accordion } from './Accordion.jsx';
export { Alert, Banner } from './Alert.jsx';
export { Kbd } from './Kbd.jsx';
