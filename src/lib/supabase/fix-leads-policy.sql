-- Ensures the anonymous-insert policy on `leads` exists.
-- Safe to run multiple times.

drop policy if exists "Anyone can submit lead" on leads;

create policy "Anyone can submit lead"
  on leads for insert
  to anon, authenticated
  with check (true);
