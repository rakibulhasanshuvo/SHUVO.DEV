-- =============================================
-- PHASE 3: Row-Level Security Policies
-- Execute this in Supabase SQL Editor
-- =============================================

-- 1. Enable RLS on all tables
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_tiers ENABLE ROW LEVEL SECURITY;

-- 2. Clean up any existing policies to prevent conflicts
DROP POLICY IF EXISTS "Admin read leads" ON leads;
DROP POLICY IF EXISTS "Admin modify leads" ON leads;
DROP POLICY IF EXISTS "Block anon leads" ON leads;
DROP POLICY IF EXISTS "Admin full access projects" ON projects;
DROP POLICY IF EXISTS "Public read projects" ON projects;
DROP POLICY IF EXISTS "Admin full access templates" ON templates;
DROP POLICY IF EXISTS "Public read templates" ON templates;
DROP POLICY IF EXISTS "Admin full access service_tiers" ON service_tiers;

-- 3. Authenticated admin-only READ/UPDATE/DELETE on leads
-- Uses database parameter 'app.authorized_admins' with automatic fallback to your defaults:
CREATE POLICY "Admin read leads"
  ON leads FOR SELECT TO authenticated
  USING (auth.jwt() ->> 'email' IN (
    SELECT unnest(string_to_array(coalesce(nullif(current_setting('app.authorized_admins', true), ''), 'hasanshuvo541@gmail.com,m.rakibul.h45@gmail.com'), ','))
  ));

CREATE POLICY "Admin modify leads"
  ON leads FOR ALL TO authenticated
  USING (auth.jwt() ->> 'email' IN (
    SELECT unnest(string_to_array(coalesce(nullif(current_setting('app.authorized_admins', true), ''), 'hasanshuvo541@gmail.com,m.rakibul.h45@gmail.com'), ','))
  ));

-- 4. Same pattern for projects, templates, and service_tiers
CREATE POLICY "Admin full access projects"
  ON projects FOR ALL TO authenticated
  USING (auth.jwt() ->> 'email' IN (
    SELECT unnest(string_to_array(coalesce(nullif(current_setting('app.authorized_admins', true), ''), 'hasanshuvo541@gmail.com,m.rakibul.h45@gmail.com'), ','))
  ));

CREATE POLICY "Admin full access templates"
  ON templates FOR ALL TO authenticated
  USING (auth.jwt() ->> 'email' IN (
    SELECT unnest(string_to_array(coalesce(nullif(current_setting('app.authorized_admins', true), ''), 'hasanshuvo541@gmail.com,m.rakibul.h45@gmail.com'), ','))
  ));

CREATE POLICY "Admin full access service_tiers"
  ON service_tiers FOR ALL TO authenticated
  USING (auth.jwt() ->> 'email' IN (
    SELECT unnest(string_to_array(coalesce(nullif(current_setting('app.authorized_admins', true), ''), 'hasanshuvo541@gmail.com,m.rakibul.h45@gmail.com'), ','))
  ));

-- 5. Public read-only access to projects and templates (for the portfolio frontend)
CREATE POLICY "Public read projects"
  ON projects FOR SELECT TO anon
  USING (true);

CREATE POLICY "Public read templates"
  ON templates FOR SELECT TO anon
  USING (true);

-- 6. Block anonymous access to leads entirely
CREATE POLICY "Block anon leads"
  ON leads FOR SELECT TO anon
  USING (false);

-- =============================================
-- OPTIONAL: How to configure additional admins dynamically
-- Run this in your SQL Editor to add more emails without modifying policies:
-- ALTER DATABASE postgres SET app.authorized_admins = 'hasanshuvo541@gmail.com,m.rakibul.h45@gmail.com,new-admin@gmail.com';
-- SELECT pg_reload_conf();
-- =============================================
