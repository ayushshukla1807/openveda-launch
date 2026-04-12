-- ==========================================
-- RESTORE & POPULATE ORGANIZATIONS SQL SCRIPT
-- ==========================================
-- This script safely UPSERTS organizations into your database.
-- It covers GSoC 2026, LFX, Outreachy, and ESOC 2026.

BEGIN;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    '52°North Spatial Information Research GmbH',
    '52-north-spatial-information-research-gmbh',
    'https://api.dicebear.com/7.x/initials/svg?seed=52%C2%B0North%20Spatial%20Information%20Research%20GmbH',
    ARRAY['javascript', 'android', 'java', 'web services', 'ogc standards'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'AboutCode',
    'aboutcode',
    'https://api.dicebear.com/7.x/initials/svg?seed=AboutCode',
    ARRAY['python', 'javascript', 'Django+PostgreSQL', 'C/Rust/Go'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Accord Project',
    'accord-project',
    'https://api.dicebear.com/7.x/initials/svg?seed=Accord%20Project',
    ARRAY['python', 'javascript', 'json', 'react', 'artificial intelligence'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'AFLplusplus',
    'aflplusplus',
    'https://api.dicebear.com/7.x/initials/svg?seed=AFLplusplus',
    ARRAY['llvm', 'rust', 'fuzzing', 'qemu'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Alaska',
    'alaska',
    'https://api.dicebear.com/7.x/initials/svg?seed=Alaska',
    ARRAY[]::TEXT[],
    'GSoC 2026',
    'uaanchorage/GSoC'
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'AnkiDroid',
    'ankidroid',
    'https://api.dicebear.com/7.x/initials/svg?seed=AnkiDroid',
    ARRAY['android', 'rust', 'kotlin', 'mobile'],
    'GSoC 2026',
    'ankidroid/Anki-Android'
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'AOSSIE',
    'aossie',
    'https://api.dicebear.com/7.x/initials/svg?seed=AOSSIE',
    ARRAY['python', 'javascript', 'flutter', 'Blockchain', 'Solidity'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Apache Software Foundation',
    'apache-foundation',
    'https://api.dicebear.com/7.x/initials/svg?seed=Apache%20Software%20Foundation',
    ARRAY['c', 'java', 'c++'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'API Dash',
    'api-dash',
    'https://api.dicebear.com/7.x/initials/svg?seed=API%20Dash',
    ARRAY['python', 'react', 'flutter', 'typescript', 'ai'],
    'GSoC 2026',
    'foss42/apidash'
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'ArduPilot',
    'ardupilot',
    'https://api.dicebear.com/7.x/initials/svg?seed=ArduPilot',
    ARRAY['python', 'lua', 'c++', 'pixhawk'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Blender Foundation',
    'blender',
    'https://api.dicebear.com/7.x/initials/svg?seed=Blender%20Foundation',
    ARRAY['c', 'python', 'opengl', 'c++', 'vulkan'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Boa',
    'boa',
    'https://api.dicebear.com/7.x/initials/svg?seed=Boa',
    ARRAY['javascript', 'rust'],
    'GSoC 2026',
    'boa-dev/boa'
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'BRL-CAD',
    'brl-cad',
    'https://api.dicebear.com/7.x/initials/svg?seed=BRL-CAD',
    ARRAY['python', 'c/c++', 'opengl', 'opencl', 'scripting'],
    'GSoC 2026',
    'BRL-CAD/brlcad'
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'C2SI',
    'c2si',
    'https://api.dicebear.com/7.x/initials/svg?seed=C2SI',
    ARRAY['python', 'java', 'go', 'nodejs', 'tensorflow'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'cBioPortal for Cancer Genomics',
    'cbioportal',
    'https://api.dicebear.com/7.x/initials/svg?seed=cBioPortal%20for%20Cancer%20Genomics',
    ARRAY['mysql', 'javascript', 'java', 'react', 'typescript'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'CCExtractor Development',
    'ccextractor',
    'https://api.dicebear.com/7.x/initials/svg?seed=CCExtractor%20Development',
    ARRAY['c', 'linux', 'rust', 'flutter'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Ceph',
    'ceph',
    'https://api.dicebear.com/7.x/initials/svg?seed=Ceph',
    ARRAY['python', 'javascript', 'c++'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'CERN-HSF',
    'cern-hsf',
    'https://api.dicebear.com/7.x/initials/svg?seed=CERN-HSF',
    ARRAY['python', 'c/c++', 'data analysis', 'artificial intelligence', 'container orchestration'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'CGAL Project',
    'cgal',
    'https://api.dicebear.com/7.x/initials/svg?seed=CGAL%20Project',
    ARRAY['c++', 'qt'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'checkstyle',
    'checkstyle',
    'https://api.dicebear.com/7.x/initials/svg?seed=checkstyle',
    ARRAY['java', 'antlr', 'artificial-intelligence'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'CircuitVerse.org',
    'circuitverse',
    'https://api.dicebear.com/7.x/initials/svg?seed=CircuitVerse.org',
    ARRAY['javascript', 'ruby', 'rails', 'canvas', 'vue'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'CNCF',
    'cncf',
    'https://api.dicebear.com/7.x/initials/svg?seed=CNCF',
    ARRAY['prometheus', 'kubernetes', 'OpenTelemetry', 'envoy'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'CRIU',
    'criu',
    'https://api.dicebear.com/7.x/initials/svg?seed=CRIU',
    ARRAY['c', 'python', 'linux', 'go'],
    'GSoC 2026',
    'checkpoint-restore/criu'
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Cuneiform Digital Library Initiative (CDLI)',
    'cdli',
    'https://api.dicebear.com/7.x/initials/svg?seed=Cuneiform%20Digital%20Library%20Initiative%20(CDLI)',
    ARRAY['mysql', 'javascript', 'docker', 'php', 'SCSS'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'D Language Foundation',
    'd-language',
    'https://api.dicebear.com/7.x/initials/svg?seed=D%20Language%20Foundation',
    ARRAY['linux', 'make', 'd', 'windows', 'C\C++'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Dart',
    'dart',
    'https://api.dicebear.com/7.x/initials/svg?seed=Dart',
    ARRAY['flutter', 'dart'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Data for the Common Good',
    'data-common-good',
    'https://api.dicebear.com/7.x/initials/svg?seed=Data%20for%20the%20Common%20Good',
    ARRAY['python', 'javascript', 'kubernetes', 'reactjs', 'terraform'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'DBpedia',
    'dbpedia',
    'https://api.dicebear.com/7.x/initials/svg?seed=DBpedia',
    ARRAY['python', 'javascript', 'java', 'scala', 'rdf'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Debian',
    'debian',
    'https://api.dicebear.com/7.x/initials/svg?seed=Debian',
    ARRAY['python', 'java', 'perl', 'c++', 'rust'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'DeepChem',
    'deepchem',
    'https://api.dicebear.com/7.x/initials/svg?seed=DeepChem',
    ARRAY['python', 'numpy', 'pytorch', 'HuggingFace'],
    'GSoC 2026',
    'deepchem/deepchem'
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Django Software Foundation',
    'django',
    'https://api.dicebear.com/7.x/initials/svg?seed=Django%20Software%20Foundation',
    ARRAY['python', 'django'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'dora-rs',
    'dora-rs',
    'https://api.dicebear.com/7.x/initials/svg?seed=dora-rs',
    ARRAY['python', 'ros', 'c++', 'rust'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Drupal Association',
    'drupal',
    'https://api.dicebear.com/7.x/initials/svg?seed=Drupal%20Association',
    ARRAY['mysql', 'javascript', 'html', 'php', 'symfony'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Eclipse Foundation',
    'eclipse',
    'https://api.dicebear.com/7.x/initials/svg?seed=Eclipse%20Foundation',
    ARRAY['java', 'rtos', 'eclipsejavaide', 'jakartaee', 'softwaredefinedvehicles'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'EROFS filesystem',
    'erofs',
    'https://api.dicebear.com/7.x/initials/svg?seed=EROFS%20filesystem',
    ARRAY['c', 'android', 'linux kernel', 'Containerd', 'gVisor'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'FFmpeg',
    'ffmpeg',
    'https://api.dicebear.com/7.x/initials/svg?seed=FFmpeg',
    ARRAY['c', 'git', 'asm'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'FLARE',
    'flare',
    'https://api.dicebear.com/7.x/initials/svg?seed=FLARE',
    ARRAY['python', 'Sandbox', 'ida-pro'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Fortran-lang',
    'fortran',
    'https://api.dicebear.com/7.x/initials/svg?seed=Fortran-lang',
    ARRAY['python', 'c++', 'fortran'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'FOSSASIA',
    'fossasia',
    'https://api.dicebear.com/7.x/initials/svg?seed=FOSSASIA',
    ARRAY['c', 'python', 'javascript', 'django', 'android'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'FOSSology',
    'fossology',
    'https://api.dicebear.com/7.x/initials/svg?seed=FOSSology',
    ARRAY['python', 'postgresql', 'c/c++', 'go', 'php'],
    'GSoC 2026',
    'fossology/fossology'
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Free and Open Source Silicon Foundation',
    'fossi',
    'https://api.dicebear.com/7.x/initials/svg?seed=Free%20and%20Open%20Source%20Silicon%20Foundation',
    ARRAY['verilog', 'vhdl', 'risc-v', 'compiler'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'FreeCAD',
    'freecad',
    'https://api.dicebear.com/7.x/initials/svg?seed=FreeCAD',
    ARRAY['python', 'c++', 'qt', 'OpenCASCADE', 'OpenInventor'],
    'GSoC 2026',
    'freecad/freecad'
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Gambit: The package for computation in game theory',
    'gambit',
    'https://api.dicebear.com/7.x/initials/svg?seed=Gambit%3A%20The%20package%20for%20computation%20in%20game%20theory',
    ARRAY['python', 'c++', 'wxwidgets', 'visualization'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Gemini CLI',
    'gemini-cli',
    'https://api.dicebear.com/7.x/initials/svg?seed=Gemini%20CLI',
    ARRAY['typescript', 'GenAI', 'MCP', 'Software Agent', 'A2A'],
    'GSoC 2026',
    'google-gemini/gemini-cli'
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Genome Assembly and Annotation',
    'genome-assembly',
    'https://api.dicebear.com/7.x/initials/svg?seed=Genome%20Assembly%20and%20Annotation',
    ARRAY['python', 'mysql', 'docker', 'pytorch', 'nextflow'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'GeomScale',
    'geomscale',
    'https://api.dicebear.com/7.x/initials/svg?seed=GeomScale',
    ARRAY['python', 'c++', 'r', 'jupyter', 'github-actions'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'German Center for Open Source AI',
    'german-center-ai',
    'https://api.dicebear.com/7.x/initials/svg?seed=German%20Center%20for%20Open%20Source%20AI',
    ARRAY['python', 'pytorch', 'scikit-learn'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Git',
    'git',
    'https://api.dicebear.com/7.x/initials/svg?seed=Git',
    ARRAY['shell script', 'git', 'c language'],
    'GSoC 2026',
    'git/git'
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Global Alliance for Genomics and Health',
    'ga4gh',
    'https://api.dicebear.com/7.x/initials/svg?seed=Global%20Alliance%20for%20Genomics%20and%20Health',
    ARRAY['python', 'postgresql', 'java', 'react', 'rust'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'GNOME Foundation',
    'gnome',
    'https://api.dicebear.com/7.x/initials/svg?seed=GNOME%20Foundation',
    ARRAY['c', 'linux', 'rust', 'gtk', 'Flatpak'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'GNU Compiler Collection (GCC)',
    'gcc',
    'https://api.dicebear.com/7.x/initials/svg?seed=GNU%20Compiler%20Collection%20(GCC)',
    ARRAY['c/c++', 'gnu make', 'gnu autotools'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'GNU Image Manipulation Program',
    'gimp',
    'https://api.dicebear.com/7.x/initials/svg?seed=GNU%20Image%20Manipulation%20Program',
    ARRAY['c', 'GEGL'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'GNU Mailman',
    'mailman',
    'https://api.dicebear.com/7.x/initials/svg?seed=GNU%20Mailman',
    ARRAY['python', 'django', 'rest', 'sqlalchemy', 'zope'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'GNU Octave',
    'octave',
    'https://api.dicebear.com/7.x/initials/svg?seed=GNU%20Octave',
    ARRAY['c++', 'hg'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'GNU Project',
    'gnu',
    'https://api.dicebear.com/7.x/initials/svg?seed=GNU%20Project',
    ARRAY['c', 'c++', 'gcc', 'autotools', 'GNU'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'GNU Radio',
    'gnu-radio',
    'https://api.dicebear.com/7.x/initials/svg?seed=GNU%20Radio',
    ARRAY['python', 'c++', 'qt', 'simd'],
    'GSoC 2026',
    'gnuradio/gnuradio'
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'gprMax',
    'gprmax',
    'https://api.dicebear.com/7.x/initials/svg?seed=gprMax',
    ARRAY['python', 'cuda', 'openmp', 'mpi', 'opencl'],
    'GSoC 2026',
    'gprMax/gprMax'
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'GRAME',
    'grame',
    'https://api.dicebear.com/7.x/initials/svg?seed=GRAME',
    ARRAY['c', 'javascript', 'c++', 'rust', 'typescript'],
    'GSoC 2026',
    'grame-cncm/faust'
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Graphite',
    'graphite',
    'https://api.dicebear.com/7.x/initials/svg?seed=Graphite',
    ARRAY['rust', 'vulkan', 'webgpu'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Haiku',
    'haiku',
    'https://api.dicebear.com/7.x/initials/svg?seed=Haiku',
    ARRAY['c++', 'posix', 'unix'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Haskell.org',
    'haskell',
    'https://api.dicebear.com/7.x/initials/svg?seed=Haskell.org',
    ARRAY['haskell', 'ghc'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'HumanAI',
    'humanai',
    'https://api.dicebear.com/7.x/initials/svg?seed=HumanAI',
    ARRAY['python', 'machine learning', 'c++', 'data analysis', 'artificial intelligence'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'INCF',
    'incf',
    'https://api.dicebear.com/7.x/initials/svg?seed=INCF',
    ARRAY['python', 'javascript', 'java', 'c++', 'gpu'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'International Catrobat Association',
    'catrobat',
    'https://api.dicebear.com/7.x/initials/svg?seed=International%20Catrobat%20Association',
    ARRAY['python', 'javascript', 'swift', 'kotlin', 'flutter'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Internet Archive',
    'internet-archive',
    'https://api.dicebear.com/7.x/initials/svg?seed=Internet%20Archive',
    ARRAY['python', 'javascript', 'go', 'elasticsearch', 'hadoop'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Invesalius',
    'invesalius',
    'https://api.dicebear.com/7.x/initials/svg?seed=Invesalius',
    ARRAY['python', 'cython', 'numpy', 'dicom', 'Vtk'],
    'GSoC 2026',
    'invesalius/invesalius3'
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'IOOS',
    'ioos',
    'https://api.dicebear.com/7.x/initials/svg?seed=IOOS',
    ARRAY['python', 'java', 'r', 'Zarr', 'NetCDF'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'JabRef e.V.',
    'jabref',
    'https://api.dicebear.com/7.x/initials/svg?seed=JabRef%20e.V.',
    ARRAY['java', 'javafx', 'ai', 'bibtex'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'JBoss Community',
    'jboss',
    'https://api.dicebear.com/7.x/initials/svg?seed=JBoss%20Community',
    ARRAY['java', 'react', 'golang', 'cloud'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'JdeRobot',
    'jderobot',
    'https://api.dicebear.com/7.x/initials/svg?seed=JdeRobot',
    ARRAY['python', 'ros', 'gazebo', 'opencv', 'tensorflow'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Jenkins',
    'jenkins',
    'https://api.dicebear.com/7.x/initials/svg?seed=Jenkins',
    ARRAY['javascript', 'java', 'go', 'docker', 'kubernetes'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Jitsi',
    'jitsi',
    'https://api.dicebear.com/7.x/initials/svg?seed=Jitsi',
    ARRAY['javascript', 'java', 'react', 'kotlin', 'webrtc'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Joomla!',
    'joomla',
    'https://api.dicebear.com/7.x/initials/svg?seed=Joomla!',
    ARRAY['mysql', 'javascript', 'html', 'php', 'ai'],
    'GSoC 2026',
    'joomla/joomla-cms'
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Joplin',
    'joplin',
    'https://api.dicebear.com/7.x/initials/svg?seed=Joplin',
    ARRAY['javascript', 'react', 'typescript', 'electron', 'React-Native'],
    'GSoC 2026',
    'laurent22/joplin'
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'JSON Schema',
    'json-schema',
    'https://api.dicebear.com/7.x/initials/svg?seed=JSON%20Schema',
    ARRAY['python', 'javascript', 'typescript', '.net', 'JSON Schema'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'KDE Community',
    'kde',
    'https://api.dicebear.com/7.x/initials/svg?seed=KDE%20Community',
    ARRAY['c++', 'qt', 'qml', 'data structures'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Kiwix',
    'kiwix',
    'https://api.dicebear.com/7.x/initials/svg?seed=Kiwix',
    ARRAY['python', 'c++', 'nodejs', 'kotlin', 'vue.js'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'KolibriOS Project Team',
    'kolibrios',
    'https://api.dicebear.com/7.x/initials/svg?seed=KolibriOS%20Project%20Team',
    ARRAY['c', 'assembly', 'asm', 'fasm', 'pci'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Konflux',
    'konflux',
    'https://api.dicebear.com/7.x/initials/svg?seed=Konflux',
    ARRAY['python', 'go', 'docker', 'kubernetes', 'tekton'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Kornia',
    'kornia',
    'https://api.dicebear.com/7.x/initials/svg?seed=Kornia',
    ARRAY['cuda', 'rust', 'deep learning', 'data science', 'Spatial AI'],
    'GSoC 2026',
    'kornia/kornia-rs'
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Kotlin Foundation',
    'kotlin',
    'https://api.dicebear.com/7.x/initials/svg?seed=Kotlin%20Foundation',
    ARRAY['gradle', 'kotlin', 'jvm', 'Parsers & Compilers', 'Multiplatform'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Kubeflow',
    'kubeflow',
    'https://api.dicebear.com/7.x/initials/svg?seed=Kubeflow',
    ARRAY['python', 'go', 'kubernetes', 'typescript', 'YAML'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'KubeVirt',
    'kubevirt',
    'https://api.dicebear.com/7.x/initials/svg?seed=KubeVirt',
    ARRAY['golang', 'grpc'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'LabLua',
    'lablua',
    'https://api.dicebear.com/7.x/initials/svg?seed=LabLua',
    ARRAY['lua', 'luarocks', 'kernel', 'lunatik', 'pallene'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Learning Equality',
    'learning-equality',
    'https://api.dicebear.com/7.x/initials/svg?seed=Learning%20Equality',
    ARRAY['python', 'javascript', 'django', 'vue.js'],
    'GSoC 2026',
    'learningequality/kolibri'
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Learning Unlimited',
    'learning-unlimited',
    'https://api.dicebear.com/7.x/initials/svg?seed=Learning%20Unlimited',
    ARRAY['python', 'javascript', 'django', 'html', 'css'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'LibreCube Initiative',
    'librecube',
    'https://api.dicebear.com/7.x/initials/svg?seed=LibreCube%20Initiative',
    ARRAY['python', 'docker', 'raspberry pi', 'micropython'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'LibreHealth',
    'librehealth',
    'https://api.dicebear.com/7.x/initials/svg?seed=LibreHealth',
    ARRAY['python', 'javascript', 'android', 'java', 'dart/flutter'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'LibreOffice',
    'libreoffice',
    'https://api.dicebear.com/7.x/initials/svg?seed=LibreOffice',
    ARRAY['python', 'java', 'c++'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'libssh',
    'libssh',
    'https://api.dicebear.com/7.x/initials/svg?seed=libssh',
    ARRAY['c', 'git', 'ci', 'ssh', 'sftp'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Liquid Galaxy project',
    'liquid-galaxy',
    'https://api.dicebear.com/7.x/initials/svg?seed=Liquid%20Galaxy%20project',
    ARRAY['linux', 'android', 'nodejs', 'flutter', 'Google Earth'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'LLVM Compiler Infrastructure',
    'llvm',
    'https://api.dicebear.com/7.x/initials/svg?seed=LLVM%20Compiler%20Infrastructure',
    ARRAY['llvm', 'c++', 'clang', 'mlir'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Machine Learning for Science (ML4SCI)',
    'ml4sci',
    'https://api.dicebear.com/7.x/initials/svg?seed=Machine%20Learning%20for%20Science%20(ML4SCI)',
    ARRAY['python', 'machine learning', 'c++', 'data analysis', 'artificial intelligence'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'MalariaGEN',
    'malariagen',
    'https://api.dicebear.com/7.x/initials/svg?seed=MalariaGEN',
    ARRAY['python', 'GCS'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'MariaDB',
    'mariadb',
    'https://api.dicebear.com/7.x/initials/svg?seed=MariaDB',
    ARRAY['python', 'javascript', 'c/c++', 'perl', 'databases'],
    'GSoC 2026',
    'MariaDB/server'
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'MDAnalysis',
    'mdanalysis',
    'https://api.dicebear.com/7.x/initials/svg?seed=MDAnalysis',
    ARRAY['python', 'cython', 'c/c++'],
    'GSoC 2026',
    'MDAnalysis/mdanalysis'
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Measurement Lab',
    'm-lab',
    'https://api.dicebear.com/7.x/initials/svg?seed=Measurement%20Lab',
    ARRAY['python', 'javascript', 'html', 'sql', 'css'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Meshery',
    'meshery',
    'https://api.dicebear.com/7.x/initials/svg?seed=Meshery',
    ARRAY['javascript', 'golang', 'kubernetes', 'ai', 'visual design'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'MetaBrainz Foundation Inc',
    'metabrainz',
    'https://api.dicebear.com/7.x/initials/svg?seed=MetaBrainz%20Foundation%20Inc',
    ARRAY['python', 'machine learning', 'perl', 'postgres', 'spark'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'MetaCall',
    'metacall',
    'https://api.dicebear.com/7.x/initials/svg?seed=MetaCall',
    ARRAY['python', 'c++', 'rust', 'nodejs', 'docker'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Metaflow',
    'metaflow',
    'https://api.dicebear.com/7.x/initials/svg?seed=Metaflow',
    ARRAY['python', 'javascript', 'kubernetes'],
    'GSoC 2026',
    'Netflix/metaflow'
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Metasploit',
    'metasploit',
    'https://api.dicebear.com/7.x/initials/svg?seed=Metasploit',
    ARRAY['c', 'python', 'postgresql', 'ruby', 'assembly'],
    'GSoC 2026',
    'rapid7/metasploit-framework'
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'MIT App Inventor',
    'mit-app-inventor',
    'https://api.dicebear.com/7.x/initials/svg?seed=MIT%20App%20Inventor',
    ARRAY['javascript', 'java', 'gwt', 'swift'],
    'GSoC 2026',
    'mit-cml/appinventor-sources'
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Mixxx',
    'mixxx',
    'https://api.dicebear.com/7.x/initials/svg?seed=Mixxx',
    ARRAY['javascript', 'c++', 'qt', 'pytorch', 'onnx'],
    'GSoC 2026',
    'mixxxdj/mixxx'
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'MLLAM',
    'mllam',
    'https://api.dicebear.com/7.x/initials/svg?seed=MLLAM',
    ARRAY['python', 'numpy', 'pytorch', 'xarray', 'Zarr'],
    'GSoC 2026',
    'mllam/neural-lam'
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'MoFA Org',
    'mofa',
    'https://api.dicebear.com/7.x/initials/svg?seed=MoFA%20Org',
    ARRAY['python', 'rust'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'MoganLab',
    'moganlab',
    'https://api.dicebear.com/7.x/initials/svg?seed=MoganLab',
    ARRAY['c++', 'qt', 'scheme'],
    'GSoC 2026',
    'XmacsLabs/mogan'
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'National Resource for Network Biology (NRNB)',
    'nrnb',
    'https://api.dicebear.com/7.x/initials/svg?seed=National%20Resource%20for%20Network%20Biology%20(NRNB)',
    ARRAY['python', 'javascript', 'html', 'css', 'LLM'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Neovim',
    'neovim',
    'https://api.dicebear.com/7.x/initials/svg?seed=Neovim',
    ARRAY['c', 'lua'],
    'GSoC 2026',
    'neovim/neovim'
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Neuroinformatics Unit',
    'niu',
    'https://api.dicebear.com/7.x/initials/svg?seed=Neuroinformatics%20Unit',
    ARRAY['python', 'numpy', 'pytorch', 'Scipy', 'napari'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Neutralinojs',
    'neutralinojs',
    'https://api.dicebear.com/7.x/initials/svg?seed=Neutralinojs',
    ARRAY['c', 'javascript', 'node.js', 'c++', 'typescript'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'NixOS Foundation',
    'nixos',
    'https://api.dicebear.com/7.x/initials/svg?seed=NixOS%20Foundation',
    ARRAY['git', 'nix'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'NumFOCUS',
    'numfocus',
    'https://api.dicebear.com/7.x/initials/svg?seed=NumFOCUS',
    ARRAY['python', 'c++', 'r', 'julia'],
    'GSoC 2026',
    'numfocus/gsoc#organizations-confirmed-under-numfocus-umbrella'
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'omegaUp',
    'omegaup',
    'https://api.dicebear.com/7.x/initials/svg?seed=omegaUp',
    ARRAY['python', 'mysql', 'php', 'typescript', 'vue.js'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Open Food Facts',
    'openfoodfacts',
    'https://api.dicebear.com/7.x/initials/svg?seed=Open%20Food%20Facts',
    ARRAY['python', 'javascript', 'machine learning', 'perl', 'flutter'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Open Genome Informatics',
    'open-genome-informatics',
    'https://api.dicebear.com/7.x/initials/svg?seed=Open%20Genome%20Informatics',
    ARRAY['python', 'react', 'r-project', 'graph', 'angular'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Open HealthCare Network',
    'ohcn',
    'https://api.dicebear.com/7.x/initials/svg?seed=Open%20HealthCare%20Network',
    ARRAY['python', 'django', 'react', 'typescript', 'NextJs'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Open Robotics',
    'osrf',
    'https://api.dicebear.com/7.x/initials/svg?seed=Open%20Robotics',
    ARRAY['python', 'ros', 'gazebo', 'c++', 'Bevy'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Open Science Initiative for Perfusion Imaging',
    'osipi',
    'https://api.dicebear.com/7.x/initials/svg?seed=Open%20Science%20Initiative%20for%20Perfusion%20Imaging',
    ARRAY['python', 'github'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Open Science Labs',
    'osl',
    'https://api.dicebear.com/7.x/initials/svg?seed=Open%20Science%20Labs',
    ARRAY['python', 'javascript', 'llvm', 'c++', 'docker'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Open Technologies Alliance - GFOSS',
    'gfoss',
    'https://api.dicebear.com/7.x/initials/svg?seed=Open%20Technologies%20Alliance%20-%20GFOSS',
    ARRAY['javascript', 'c/c++', 'nodejs', 'python 3', 'Machine Learning (ML)'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Open Transit Software Foundation',
    'otsf',
    'https://api.dicebear.com/7.x/initials/svg?seed=Open%20Transit%20Software%20Foundation',
    ARRAY['android', 'java', 'golang', 'docker', 'ios'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'OpenAFS',
    'openafs',
    'https://api.dicebear.com/7.x/initials/svg?seed=OpenAFS',
    ARRAY['c', 'python', 'javascript', 'git', 'tcp/udp'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'OpenAstronomy',
    'openastronomy',
    'https://api.dicebear.com/7.x/initials/svg?seed=OpenAstronomy',
    ARRAY['c', 'python', 'c++', 'julia'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'OpenELIS Global',
    'openelis',
    'https://api.dicebear.com/7.x/initials/svg?seed=OpenELIS%20Global',
    ARRAY['postgresql', 'javascript', 'java', 'react', 'spring'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'OpenMRS',
    'openmrs',
    'https://api.dicebear.com/7.x/initials/svg?seed=OpenMRS',
    ARRAY['mysql', 'javascript', 'java', 'reactjs', 'fhir'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'OpenMS Inc',
    'openms',
    'https://api.dicebear.com/7.x/initials/svg?seed=OpenMS%20Inc',
    ARRAY['python', 'cython', 'c++', 'pytorch', 'Streamlit'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'OpenStreetMap',
    'openstreetmap',
    'https://api.dicebear.com/7.x/initials/svg?seed=OpenStreetMap',
    ARRAY['python', 'javascript', 'c++', 'docker', 'glTF'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'openSUSE Project',
    'opensuse',
    'https://api.dicebear.com/7.x/initials/svg?seed=openSUSE%20Project',
    ARRAY['python', 'c/c++', 'go', 'ruby', 'reactjs javascript'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'OpenVINO Toolkit',
    'openvino',
    'https://api.dicebear.com/7.x/initials/svg?seed=OpenVINO%20Toolkit',
    ARRAY['python', 'c++', 'arm', 'x86'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'OpenWISP',
    'openwisp',
    'https://api.dicebear.com/7.x/initials/svg?seed=OpenWISP',
    ARRAY['python', 'javascript', 'django', 'lua', 'openwrt'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Oppia Foundation',
    'oppia',
    'https://api.dicebear.com/7.x/initials/svg?seed=Oppia%20Foundation',
    ARRAY['python', 'google app engine', 'angular', 'typescript', 'Apache Beam'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'OSGeo (Open Source Geospatial Foundation)',
    'osgeo',
    'https://api.dicebear.com/7.x/initials/svg?seed=OSGeo%20(Open%20Source%20Geospatial%20Foundation)',
    ARRAY['c', 'python', 'javascript', 'java', 'c++'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'OWASP Foundation',
    'owasp',
    'https://api.dicebear.com/7.x/initials/svg?seed=OWASP%20Foundation',
    ARRAY['python', 'javascript', 'java', 'ZAP', 'Juice Shop'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    ' PEcAn Project',
    'pecan',
    'https://api.dicebear.com/7.x/initials/svg?seed=%20PEcAn%20Project',
    ARRAY['r', 'docker', 'api', 'geospatial'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Pharo Consortium',
    'pharo',
    'https://api.dicebear.com/7.x/initials/svg?seed=Pharo%20Consortium',
    ARRAY['git', 'smalltalk', 'pharo', 'spec', 'SUnit'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'PostgreSQL',
    'postgresql',
    'https://api.dicebear.com/7.x/initials/svg?seed=PostgreSQL',
    ARRAY['c', 'python', 'postgresql', 'javascript', 'go'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'preCICE',
    'precice',
    'https://api.dicebear.com/7.x/initials/svg?seed=preCICE',
    ARRAY['c', 'python', 'shell', 'c++'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Processing Foundation',
    'processing',
    'https://api.dicebear.com/7.x/initials/svg?seed=Processing%20Foundation',
    ARRAY['javascript', 'java', 'typescript', 'webgl', 'GitHub Actions'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Project Mesa',
    'project-mesa',
    'https://api.dicebear.com/7.x/initials/svg?seed=Project%20Mesa',
    ARRAY['python', 'gis', 'object oriented programming', 'LLMs', 'network topology'],
    'GSoC 2026',
    'projectmesa/mesa'
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Python Software Foundation',
    'python',
    'https://api.dicebear.com/7.x/initials/svg?seed=Python%20Software%20Foundation',
    ARRAY['python', 'javascript'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'QC-Devs',
    'qc-devs',
    'https://api.dicebear.com/7.x/initials/svg?seed=QC-Devs',
    ARRAY['python', 'github', 'c++', 'julia', 'jupyter'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'QEMU',
    'qemu',
    'https://api.dicebear.com/7.x/initials/svg?seed=QEMU',
    ARRAY['c', 'python', 'linux', 'rust'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Qubes OS',
    'qubes',
    'https://api.dicebear.com/7.x/initials/svg?seed=Qubes%20OS',
    ARRAY['c', 'python', 'xen'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'R project for statistical computing',
    'r-project',
    'https://api.dicebear.com/7.x/initials/svg?seed=R%20project%20for%20statistical%20computing',
    ARRAY['c', 'javascript', 'c++', 'r-project', 'fortran'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Rizin',
    'rizin',
    'https://api.dicebear.com/7.x/initials/svg?seed=Rizin',
    ARRAY['c', 'python', 'go', 'c++', 'qt'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'rocket.chat',
    'rocket-chat',
    'https://api.dicebear.com/7.x/initials/svg?seed=rocket.chat',
    ARRAY['javascript', 'typescript', 'node', 'LLM', 'generative ai'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'RTEMS Project',
    'rtems',
    'https://api.dicebear.com/7.x/initials/svg?seed=RTEMS%20Project',
    ARRAY['python', 'c/c++', 'assembly', 'posix'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Ruby',
    'ruby',
    'https://api.dicebear.com/7.x/initials/svg?seed=Ruby',
    ARRAY['c', 'java', 'ruby on rails', 'ruby', 'rubygems'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'SageMath',
    'sagemath',
    'https://api.dicebear.com/7.x/initials/svg?seed=SageMath',
    ARRAY['python', 'cython'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'ScummVM',
    'scummvm',
    'https://api.dicebear.com/7.x/initials/svg?seed=ScummVM',
    ARRAY['python', 'opengl', 'c++', 'assembly', 'sdl'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'St. Jude Children''s Research Hospital',
    'st-jude',
    'https://api.dicebear.com/7.x/initials/svg?seed=St.%20Jude%20Children's%20Research%20Hospital',
    ARRAY['python', 'rust', 'simd', 'WDL'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'stdlib',
    'stdlib',
    'https://api.dicebear.com/7.x/initials/svg?seed=stdlib',
    ARRAY['c', 'javascript', 'node.js', 'typescript', 'webassembly'],
    'GSoC 2026',
    'stdlib-js/stdlib'
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Ste||ar group',
    'stellar-group',
    'https://api.dicebear.com/7.x/initials/svg?seed=Ste%7C%7Car%20group',
    ARRAY['c++', 'hpc'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Stichting SU2',
    'su2',
    'https://api.dicebear.com/7.x/initials/svg?seed=Stichting%20SU2',
    ARRAY['python', 'c++'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Submitty',
    'submitty',
    'https://api.dicebear.com/7.x/initials/svg?seed=Submitty',
    ARRAY['python', 'postgresql', 'javascript', 'c++', 'php'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Sugar Labs',
    'sugar-labs',
    'https://api.dicebear.com/7.x/initials/svg?seed=Sugar%20Labs',
    ARRAY['python', 'gtk', 'typescript', 'javascipt', 'LLM'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'SW360',
    'sw360',
    'https://api.dicebear.com/7.x/initials/svg?seed=SW360',
    ARRAY['java', 'react', 'couchdb', 'SpringBoot'],
    'GSoC 2026',
    'eclipse-sw360/sw360'
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Swift',
    'swift',
    'https://api.dicebear.com/7.x/initials/svg?seed=Swift',
    ARRAY['c++', 'cmake', 'swift'],
    'GSoC 2026',
    'apple/swift'
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'SymPy',
    'sympy',
    'https://api.dicebear.com/7.x/initials/svg?seed=SymPy',
    ARRAY['python', 'numpy', 'jupyter'],
    'GSoC 2026',
    'sympy/sympy'
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Synfig',
    'synfig',
    'https://api.dicebear.com/7.x/initials/svg?seed=Synfig',
    ARRAY['python', 'c++', 'gtk', 'gtkmm'],
    'GSoC 2026',
    'synfig/synfig'
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'TARDIS RT Collaboration',
    'tardis-rt',
    'https://api.dicebear.com/7.x/initials/svg?seed=TARDIS%20RT%20Collaboration',
    ARRAY['python', 'numba', 'numpy', 'jupyter', 'pandas'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'The FreeBSD Project',
    'freebsd',
    'https://api.dicebear.com/7.x/initials/svg?seed=The%20FreeBSD%20Project',
    ARRAY['c', 'llvm', 'assembly', 'make', 'POSIX shell'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'The Honeynet Project',
    'honeynet',
    'https://api.dicebear.com/7.x/initials/svg?seed=The%20Honeynet%20Project',
    ARRAY['python', 'javascript', 'django', 'go', 'docker'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'The JPF team',
    'jpf',
    'https://api.dicebear.com/7.x/initials/svg?seed=The%20JPF%20team',
    ARRAY['android', 'java', 'distributed systems', 'jvm'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'The Julia Language',
    'julia',
    'https://api.dicebear.com/7.x/initials/svg?seed=The%20Julia%20Language',
    ARRAY['machine learning', 'julia', 'data science', 'compilers', 'garbage-collection'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'The Libreswan Project',
    'libreswan',
    'https://api.dicebear.com/7.x/initials/svg?seed=The%20Libreswan%20Project',
    ARRAY['c', 'kernel', 'nss', 'RFCs', 'libevent'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'The Linux Foundation',
    'linux-foundation',
    'https://api.dicebear.com/7.x/initials/svg?seed=The%20Linux%20Foundation',
    ARRAY['c', 'linux', 'cups', 'ai', 'fuzz-testing'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'The Mifos Initiative',
    'mifos',
    'https://api.dicebear.com/7.x/initials/svg?seed=The%20Mifos%20Initiative',
    ARRAY['android', 'java', 'kotlin', 'spring', 'angular'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'The NetBSD Foundation',
    'netbsd',
    'https://api.dicebear.com/7.x/initials/svg?seed=The%20NetBSD%20Foundation',
    ARRAY['c', 'shell script', 'make', 'unix', 'bsd'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'The ns-3 Network Simulator Project',
    'ns-3',
    'https://api.dicebear.com/7.x/initials/svg?seed=The%20ns-3%20Network%20Simulator%20Project',
    ARRAY['python', 'django', 'c++'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'The OpenROAD Initiative',
    'openroad',
    'https://api.dicebear.com/7.x/initials/svg?seed=The%20OpenROAD%20Initiative',
    ARRAY['python', 'verilog', 'c++', 'tcl', 'OpenRoad'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'The P4 Language Consortium',
    'p4',
    'https://api.dicebear.com/7.x/initials/svg?seed=The%20P4%20Language%20Consortium',
    ARRAY['llvm', 'c++', 'linux kernel', 'mlir', 'ebpf'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'The Rust Foundation',
    'rust-foundation',
    'https://api.dicebear.com/7.x/initials/svg?seed=The%20Rust%20Foundation',
    ARRAY['python', 'rust'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Tiled',
    'tiled',
    'https://api.dicebear.com/7.x/initials/svg?seed=Tiled',
    ARRAY['c++', 'qt'],
    'GSoC 2026',
    'mapeditor/tiled'
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Typelevel',
    'typelevel',
    'https://api.dicebear.com/7.x/initials/svg?seed=Typelevel',
    ARRAY['linux', 'node.js', 'jvm', 'scala', 'wasm'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'UC OSPO',
    'uc-ospo',
    'https://api.dicebear.com/7.x/initials/svg?seed=UC%20OSPO',
    ARRAY['python', 'javascript', 'c/c++', 'machine learning', 'pytorch'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Unikraft',
    'unikraft',
    'https://api.dicebear.com/7.x/initials/svg?seed=Unikraft',
    ARRAY['c', 'xen', 'golang', 'kvm', 'assembly language'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'United Nations Office of Information Communication Technology',
    'un-oict',
    'https://api.dicebear.com/7.x/initials/svg?seed=United%20Nations%20Office%20of%20Information%20Communication%20Technology',
    ARRAY['python', 'javascript', 'css'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Uramaki LAB',
    'uramaki-lab',
    'https://api.dicebear.com/7.x/initials/svg?seed=Uramaki%20LAB',
    ARRAY['python', 'javascript', 'html', 'css', 'Firebase'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'VideoLAN',
    'videolan',
    'https://api.dicebear.com/7.x/initials/svg?seed=VideoLAN',
    ARRAY['c', 'c++', 'qt', 'assembly', 'video'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Wagtail',
    'wagtail',
    'https://api.dicebear.com/7.x/initials/svg?seed=Wagtail',
    ARRAY['python', 'javascript', 'django'],
    'GSoC 2026',
    'wagtail/wagtail'
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'webpack',
    'webpack',
    'https://api.dicebear.com/7.x/initials/svg?seed=webpack',
    ARRAY['javascript', 'typescript', 'node'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Wikimedia Foundation',
    'wikimedia',
    'https://api.dicebear.com/7.x/initials/svg?seed=Wikimedia%20Foundation',
    ARRAY['javascript', 'html', 'php', 'css', 'Phyton'],
    'GSoC 2026',
    NULL
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;

INSERT INTO organizations (name, slug, logo_url, tech_stack, program, repo_path)
VALUES (
    'Zulip',
    'zulip',
    'https://api.dicebear.com/7.x/initials/svg?seed=Zulip',
    ARRAY['python', 'django', 'flutter', 'css', 'typescript'],
    'GSoC 2026',
    'zulip/zulip'
)
ON CONFLICT (slug) DO UPDATE SET 
    tech_stack = EXCLUDED.tech_stack,
    program = EXCLUDED.program,
    logo_url = EXCLUDED.logo_url,
    repo_path = EXCLUDED.repo_path;


INSERT INTO organizations (name, slug, logo_url, tech_stack, program)
VALUES ('Appsmith', 'appsmith', 'https://avatars.githubusercontent.com/u/53011310?s=200&v=4', ARRAY['Java', 'Spring Boot', 'React', 'TypeScript', 'MongoDB'], 'GSoC 2026')
ON CONFLICT (slug) DO UPDATE SET logo_url = EXCLUDED.logo_url, tech_stack = EXCLUDED.tech_stack, program = EXCLUDED.program;

-- Insert LFX Mentorship Organizations
INSERT INTO organizations (name, slug, logo_url, tech_stack, program, description)
VALUES 
('Linux Kernel', 'linux-kernel', 'https://upload.wikimedia.org/wikipedia/commons/3/35/Tux.svg', ARRAY['C', 'Assembly', 'Make'], 'LFX', 'The core of the Linux operating system.'),
('Kubernetes', 'kubernetes', 'https://upload.wikimedia.org/wikipedia/commons/3/39/Kubernetes_logo_without_workmark.svg', ARRAY['Go', 'Bash', 'Docker'], 'LFX', 'Production-grade container orchestration.'),
('Cloud Native Computing Foundation', 'cncf', 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Cloud_Native_Computing_Foundation_logo.svg', ARRAY['Go', 'Rust', 'Cloud'], 'LFX', 'Fostering and sustaining an ecosystem of open source, vendor-neutral projects.')
ON CONFLICT (slug) DO UPDATE SET logo_url = EXCLUDED.logo_url, tech_stack = EXCLUDED.tech_stack, program = EXCLUDED.program, description = EXCLUDED.description;

-- Insert Outreachy Organizations
INSERT INTO organizations (name, slug, logo_url, tech_stack, program, description, repo_path)
VALUES 
('GNOME', 'gnome', 'https://upload.wikimedia.org/wikipedia/commons/3/3d/GNOME_logo.svg', ARRAY['C', 'Rust', 'Python', 'GTK'], 'Outreachy', 'The desktop environment for the Linux community.', 'GNOME/gnome-shell'),
('Fedora', 'fedora', 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Fedora_logo.svg', ARRAY['Python', 'Shell', 'C', 'Ansible'], 'Outreachy', 'A community-driven Linux distribution and OS ecosystem.', 'fedora-infra/fedora-messaging'),
('OpenTelemetry', 'opentelemetry', 'https://raw.githubusercontent.com/open-telemetry/opentelemetry.io/main/icon.svg', ARRAY['Go', 'Java', 'Python', 'Collector'], 'Outreachy', 'A collection of tools, APIs, and SDKs for observability.', 'open-telemetry/opentelemetry-collector')
ON CONFLICT (slug) DO UPDATE SET logo_url = EXCLUDED.logo_url, tech_stack = EXCLUDED.tech_stack, program = EXCLUDED.program, description = EXCLUDED.description, repo_path = EXCLUDED.repo_path;

-- Insert ESOC 2026 Organizations
INSERT INTO organizations (name, slug, logo_url, tech_stack, program, description, repo_path)
VALUES 
('OpenSource Health', 'os-health', 'https://api.dicebear.com/7.x/initials/svg?seed=OH', ARRAY['React', 'Node.js', 'PostgreSQL'], 'ESOC 2026', 'Building open tools for community healthcare in Europe.', 'os-health/core'),
('GreenCode', 'greencode', 'https://api.dicebear.com/7.x/initials/svg?seed=GC', ARRAY['Python', 'D3.js', 'EarthData'], 'ESOC 2026', 'Open data pipelines for environmental monitoring.', 'greencode/pipeline')
ON CONFLICT (slug) DO UPDATE SET logo_url = EXCLUDED.logo_url, tech_stack = EXCLUDED.tech_stack, program = EXCLUDED.program, description = EXCLUDED.description, repo_path = EXCLUDED.repo_path;
COMMIT;
