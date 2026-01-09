# Modelo de Dados (PostgreSQL)

## users
- id (uuid, pk)
- team_id (uuid, fk)
- name
- email
- auth_provider (google, magic_link)
- role (admin, editor, viewer)
- created_at

## teams
- id (uuid, pk)
- name
- plan
- retention_days
- created_at

## meetings
- id (uuid, pk)
- team_id (uuid, fk)
- title
- description
- platform (meet, zoom, teams, presencial, upload)
- language
- status (queued, processing, ready, error)
- started_at
- duration_seconds
- recording_url
- created_at

## participants
- id (uuid, pk)
- meeting_id (uuid, fk)
- name
- role
- email
- source (calendar, diarization, manual)

## transcripts
- id (uuid, pk)
- meeting_id (uuid, fk)
- language
- diarization_json
- words_json
- created_at

## summaries
- id (uuid, pk)
- meeting_id (uuid, fk)
- template (daily, one_on_one, sales, exec, custom)
- summary_json
- created_at

## tasks
- id (uuid, pk)
- meeting_id (uuid, fk)
- title
- owner
- due_date
- status

## decisions
- id (uuid, pk)
- meeting_id (uuid, fk)
- decision
- created_at

## exports
- id (uuid, pk)
- meeting_id (uuid, fk)
- format (pdf, md, notion, slack, email)
- status
- url
- created_at

## audit_logs
- id (uuid, pk)
- team_id (uuid, fk)
- actor_id (uuid, fk users)
- action
- metadata_json
- created_at
