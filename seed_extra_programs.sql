-- Seed sample organizations for LFX and Outreachy
INSERT INTO organizations (name, slug, logo_url, tech_stack, program, category)
VALUES 
    ('Hyperledger', 'hyperledger', null, '{blockchain, go, nodejs}', 'LFX', 'Cloud Native'),
    ('Cloud Native Computing Foundation', 'cncf-lfx', null, '{kubernetes, prometheus, go}', 'LFX', 'Cloud Native'),
    ('RISC-V International', 'risc-v', null, '{assembly, c, python}', 'LFX', 'Hardware'),
    ('Wikimedia Foundation', 'wikimedia', null, '{php, javascript, mediawiki}', 'Outreachy', 'Web Development'),
    ('GNOME', 'gnome-outreachy', null, '{c, rust, gtk}', 'Outreachy', 'Desktop'),
    ('Mozilla', 'mozilla', null, '{rust, c++, javascript}', 'Outreachy', 'Web Browser')
ON CONFLICT (slug) DO UPDATE 
SET program = EXCLUDED.program, category = EXCLUDED.category;

-- Link them to the new programs/cycles structure if the evolution script was run
DO $$
DECLARE
    lfx_id UUID;
    outreachy_id UUID;
    lfx_cycle_id UUID;
    outreachy_cycle_id UUID;
BEGIN
    -- Get program IDs
    SELECT id INTO lfx_id FROM programs WHERE slug = 'lfx';
    SELECT id INTO outreachy_id FROM programs WHERE slug = 'outreachy';

    IF lfx_id IS NOT NULL AND outreachy_id IS NOT NULL THEN
        -- Create dummy cycles if they don't exist
        INSERT INTO program_cycles (program_id, name, status) VALUES (lfx_id, 'Spring 2026', 'active') ON CONFLICT DO NOTHING;
        INSERT INTO program_cycles (program_id, name, status) VALUES (outreachy_id, 'May 2026', 'active') ON CONFLICT DO NOTHING;

        SELECT id INTO lfx_cycle_id FROM program_cycles WHERE program_id = lfx_id LIMIT 1;
        SELECT id INTO outreachy_cycle_id FROM program_cycles WHERE program_id = outreachy_id LIMIT 1;

        -- Map organizations to cycles
        INSERT INTO org_program_map (org_id, cycle_id, category)
        SELECT id, lfx_cycle_id, category FROM organizations WHERE program = 'LFX' ON CONFLICT DO NOTHING;
        
        INSERT INTO org_program_map (org_id, cycle_id, category)
        SELECT id, outreachy_cycle_id, category FROM organizations WHERE program = 'Outreachy' ON CONFLICT DO NOTHING;
    END IF;
END $$;
