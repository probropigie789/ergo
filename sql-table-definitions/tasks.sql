create table
  public.tasks (
    id uuid not null,
    title text null,
    description text null,
    status text null,
    priority text null,
    assigned_to uuid null default gen_random_uuid (),
    created_by uuid null default gen_random_uuid (),
    due_date timestamp without time zone null,
    metadata json null,
    n8n_data json null,
    completion_date timestamp without time zone null,
    constraint tasks_pkey primary key (id)
  ) tablespace pg_default;