// Default column definitions for PipelineTable.
// Kept in a separate file so PipelineTable.jsx can use Vite Fast Refresh.
export const PIPELINE_COLUMNS = [
  { key: 'account',  label: 'Account',  cellType: 'link', width: 290 },
  { key: 'deal',     label: 'Deal',     cellType: 'link' },
  { key: 'stage',    label: 'Stage',    cellType: 'link' },
  { key: 'owner',    label: 'Owner',    cellType: 'text' },
  { key: 'platform', label: 'Platform', cellType: 'text' },
  { key: 'total',    label: 'Total',    cellType: 'text' },
];
