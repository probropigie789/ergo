create table
  public.users (
    id uuid not null default auth.uid (),
    email text null,
    hashed_password text null,
    role text null,
    subdomain text null,
    company_details text null,
    name text null,
    constraint users_pkey primary key (id),
    constraint users_id_fkey foreign key (id) references auth.users (id) on delete cascade
  ) tablespace pg_default;