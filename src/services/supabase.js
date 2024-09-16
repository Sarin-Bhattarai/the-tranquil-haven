import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://rbehudbvqvfkrcyyercp.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJiZWh1ZGJ2cXZma3JjeXllcmNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY0NjI5NTcsImV4cCI6MjA0MjAzODk1N30.R2JZdH7lY1s_1cfy2Msxr5jhMcCN_g8367BqFvFxtPg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
