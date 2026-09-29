-- Row Level Security for public.contact_messages
--
-- Threat model: the contact form is public and unauthenticated, so `anon` must
-- be able to INSERT. It must never be able to read back what it wrote, edit a
-- message, or delete one. Reads and writes past INSERT are restricted to admins,
-- identified by membership in public.user_roles rather than by any client-side
-- claim.
--
-- Note: the Supabase service-role key bypasses RLS entirely. It must only ever
-- be used server-side. Nothing in this file grants or excuses that bypass.
--
-- Idempotent: safe to re-run against an already-provisioned database.

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Drop the previous policies so re-running this file converges on the
-- definitions below instead of erroring or leaving a stale permissive policy.
DROP POLICY IF EXISTS "Allow anonymous insert on contact_messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Allow admin select on contact_messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Allow admin update on contact_messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Allow admin delete on contact_messages" ON public.contact_messages;
DROP POLICY IF EXISTS "contact_messages_anon_insert" ON public.contact_messages;
DROP POLICY IF EXISTS "contact_messages_admin_select" ON public.contact_messages;
DROP POLICY IF EXISTS "contact_messages_admin_update" ON public.contact_messages;
DROP POLICY IF EXISTS "contact_messages_admin_delete" ON public.contact_messages;

-- INSERT: allowed for visitors, but constrained.
--   * `is_read` may not be true — otherwise a visitor could file spam that
--     already looks triaged and hide it from the admin inbox.
--   * length ceilings bound what a direct PostgREST call can store; they sit
--     above the contact form's own limits (25 / 250) so the form stays the
--     control and these only catch abuse.
--   * `created_at` is left to its column default.
--   * `authenticated` is included so a signed-in admin submitting the public
--     contact form is not rejected by their own table's policy.
CREATE POLICY "contact_messages_anon_insert"
  ON public.contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    coalesce(is_read, false) = false
    AND char_length(btrim(name)) BETWEEN 1 AND 100
    AND char_length(btrim(message)) BETWEEN 1 AND 2000
    AND char_length(email) BETWEEN 3 AND 254
    AND email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'
  );

-- SELECT: admins only. There is deliberately no anon SELECT policy, so a
-- visitor cannot read back any message, including their own.
CREATE POLICY "contact_messages_admin_select"
  ON public.contact_messages
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_roles.user_id = auth.uid()
        AND user_roles.role = 'admin'
    )
  );

-- UPDATE: admins only, and the updated row must still be admin-visible.
CREATE POLICY "contact_messages_admin_update"
  ON public.contact_messages
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_roles.user_id = auth.uid()
        AND user_roles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_roles.user_id = auth.uid()
        AND user_roles.role = 'admin'
    )
  );

-- DELETE: admins only.
CREATE POLICY "contact_messages_admin_delete"
  ON public.contact_messages
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_roles.user_id = auth.uid()
        AND user_roles.role = 'admin'
    )
  );
