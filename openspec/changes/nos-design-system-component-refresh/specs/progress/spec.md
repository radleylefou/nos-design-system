## ADDED Requirements

### Requirement: Progress supports a two-segment fill variant
The Progress component SHALL accept `variant="dual"` with a `segments` prop — an array of two objects, each with a `value` (0–100 relative) and `color` token. The two segments fill the track sequentially from left to right with a small gap between them, representing "used" and "remaining budget" (or similar paired metrics).

#### Scenario: Two segments rendered sequentially
- **WHEN** `variant="dual"` and `segments={[{ value: 78, color: "brand" }, { value: 19, color: "neutral" }]}` are passed
- **THEN** two filled segments appear in the track in sequence with a visible gap

#### Scenario: Segments do not overflow track
- **WHEN** the combined segment values would exceed the track width
- **THEN** segments are clamped so they do not render outside the track bounds
