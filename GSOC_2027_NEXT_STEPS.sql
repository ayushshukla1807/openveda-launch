-- GSOC 2027 Next Steps Migration: Repo Paths and Playbook Content
BEGIN;

UPDATE playbooks SET content_markdown = '### Welcome to 52°North Spatial Information Research GmbH!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** javascript, android, java, web services, ogc standards

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = '52-north-spatial-information-research-gmbh');

UPDATE playbooks SET content_markdown = '### Welcome to AboutCode!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, javascript, Django+PostgreSQL, C/Rust/Go

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/aboutcode-org)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'aboutcode');

UPDATE playbooks SET content_markdown = '### Welcome to Accord Project!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, javascript, json, react, artificial intelligence

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/accordproject)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'accord-project');

UPDATE playbooks SET content_markdown = '### Welcome to AFLplusplus!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** llvm, rust, fuzzing, qemu

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/AFLplusplus)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'aflplusplus');

UPDATE organizations SET repo_path = 'uaanchorage/GSoC' WHERE slug = 'alaska';
UPDATE playbooks SET content_markdown = '### Welcome to Alaska!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** Open Source

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/uaanchorage/GSoC)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'alaska');

UPDATE organizations SET repo_path = 'ankidroid/Anki-Android' WHERE slug = 'ankidroid';
UPDATE playbooks SET content_markdown = '### Welcome to AnkiDroid!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** android, rust, kotlin, mobile

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/ankidroid/Anki-Android)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'ankidroid');

UPDATE playbooks SET content_markdown = '### Welcome to AOSSIE!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, javascript, flutter, Blockchain, Solidity

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/AOSSIE-Org)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'aossie');

UPDATE playbooks SET content_markdown = '### Welcome to Apache Software Foundation!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** c, java, c++

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'apache-foundation');

UPDATE organizations SET repo_path = 'foss42/apidash' WHERE slug = 'api-dash';
UPDATE playbooks SET content_markdown = '### Welcome to API Dash!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, react, flutter, typescript, ai

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/foss42/apidash)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'api-dash');

UPDATE playbooks SET content_markdown = '### Welcome to ArduPilot!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, lua, c++, pixhawk

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/ArduPilot)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'ardupilot');

UPDATE playbooks SET content_markdown = '### Welcome to Blender Foundation!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** c, python, opengl, c++, vulkan

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'blender');

UPDATE organizations SET repo_path = 'boa-dev/boa' WHERE slug = 'boa';
UPDATE playbooks SET content_markdown = '### Welcome to Boa!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** javascript, rust

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/boa-dev/boa)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'boa');

UPDATE organizations SET repo_path = 'BRL-CAD/brlcad' WHERE slug = 'brl-cad';
UPDATE playbooks SET content_markdown = '### Welcome to BRL-CAD!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, c/c++, opengl, opencl, scripting

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/BRL-CAD/brlcad)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'brl-cad');

UPDATE playbooks SET content_markdown = '### Welcome to C2SI!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, java, go, nodejs, tensorflow

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/c2siorg)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'c2si');

UPDATE playbooks SET content_markdown = '### Welcome to cBioPortal for Cancer Genomics!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** mysql, javascript, java, react, typescript

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'cbioportal');

UPDATE playbooks SET content_markdown = '### Welcome to CCExtractor Development!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** c, linux, rust, flutter

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'ccextractor');

UPDATE playbooks SET content_markdown = '### Welcome to Ceph!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, javascript, c++

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/ceph)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'ceph');

UPDATE playbooks SET content_markdown = '### Welcome to CERN-HSF!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, c/c++, data analysis, artificial intelligence, container orchestration

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/HSF)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'cern-hsf');

UPDATE playbooks SET content_markdown = '### Welcome to CGAL Project!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** c++, qt

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'cgal');

UPDATE playbooks SET content_markdown = '### Welcome to checkstyle!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** java, antlr, artificial-intelligence

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/checkstyle)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'checkstyle');

UPDATE playbooks SET content_markdown = '### Welcome to CircuitVerse.org!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** javascript, ruby, rails, canvas, vue

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'circuitverse');

UPDATE playbooks SET content_markdown = '### Welcome to CNCF!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** prometheus, kubernetes, OpenTelemetry, envoy

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/cncf/)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'cncf');

UPDATE organizations SET repo_path = 'checkpoint-restore/criu' WHERE slug = 'criu';
UPDATE playbooks SET content_markdown = '### Welcome to CRIU!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** c, python, linux, go

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/checkpoint-restore/criu)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'criu');

UPDATE playbooks SET content_markdown = '### Welcome to Cuneiform Digital Library Initiative (CDLI)!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** mysql, javascript, docker, php, SCSS

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'cdli');

UPDATE playbooks SET content_markdown = '### Welcome to D Language Foundation!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** linux, make, d, windows, C\C++

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'd-language');

UPDATE playbooks SET content_markdown = '### Welcome to Dart!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** flutter, dart

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/dart-lang/)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'dart');

UPDATE playbooks SET content_markdown = '### Welcome to Data for the Common Good!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, javascript, kubernetes, reactjs, terraform

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'data-common-good');

UPDATE playbooks SET content_markdown = '### Welcome to DBpedia!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, javascript, java, scala, rdf

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/dbpedia/)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'dbpedia');

UPDATE playbooks SET content_markdown = '### Welcome to Debian!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, java, perl, c++, rust

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://salsa.debian.org/)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'debian');

UPDATE organizations SET repo_path = 'deepchem/deepchem' WHERE slug = 'deepchem';
UPDATE playbooks SET content_markdown = '### Welcome to DeepChem!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, numpy, pytorch, HuggingFace

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/deepchem/deepchem)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'deepchem');

UPDATE playbooks SET content_markdown = '### Welcome to Django Software Foundation!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, django

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'django');

UPDATE playbooks SET content_markdown = '### Welcome to dora-rs!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, ros, c++, rust

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'dora-rs');

UPDATE playbooks SET content_markdown = '### Welcome to Drupal Association!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** mysql, javascript, html, php, symfony

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'drupal');

UPDATE playbooks SET content_markdown = '### Welcome to Eclipse Foundation!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** java, rtos, eclipsejavaide, jakartaee, softwaredefinedvehicles

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'eclipse');

UPDATE playbooks SET content_markdown = '### Welcome to EROFS filesystem!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** c, android, linux kernel, Containerd, gVisor

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'erofs');

UPDATE playbooks SET content_markdown = '### Welcome to FFmpeg!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** c, git, asm

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://git.ffmpeg.org/ffmpeg.git)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'ffmpeg');

UPDATE playbooks SET content_markdown = '### Welcome to FLARE!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, Sandbox, ida-pro

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/search?q=topic%3Agsoc-2026+org%3Amandiant&type=Repositories)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'flare');

UPDATE playbooks SET content_markdown = '### Welcome to Fortran-lang!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, c++, fortran

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'fortran');

UPDATE playbooks SET content_markdown = '### Welcome to FOSSASIA!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** c, python, javascript, django, android

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'fossasia');

UPDATE organizations SET repo_path = 'fossology/fossology' WHERE slug = 'fossology';
UPDATE playbooks SET content_markdown = '### Welcome to FOSSology!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, postgresql, c/c++, go, php

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/fossology/fossology)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'fossology');

UPDATE playbooks SET content_markdown = '### Welcome to Free and Open Source Silicon Foundation!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** verilog, vhdl, risc-v, compiler

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'fossi');

UPDATE organizations SET repo_path = 'freecad/freecad' WHERE slug = 'freecad';
UPDATE playbooks SET content_markdown = '### Welcome to FreeCAD!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, c++, qt, OpenCASCADE, OpenInventor

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/freecad/freecad)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'freecad');

UPDATE playbooks SET content_markdown = '### Welcome to Gambit: The package for computation in game theory!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, c++, wxwidgets, visualization

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'gambit');

UPDATE organizations SET repo_path = 'google-gemini/gemini-cli' WHERE slug = 'gemini-cli';
UPDATE playbooks SET content_markdown = '### Welcome to Gemini CLI!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** typescript, GenAI, MCP, Software Agent, A2A

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/google-gemini/gemini-cli/)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'gemini-cli');

UPDATE playbooks SET content_markdown = '### Welcome to Genome Assembly and Annotation!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, mysql, docker, pytorch, nextflow

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'genome-assembly');

UPDATE playbooks SET content_markdown = '### Welcome to GeomScale!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, c++, r, jupyter, github-actions

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/GeomScale)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'geomscale');

UPDATE playbooks SET content_markdown = '### Welcome to German Center for Open Source AI!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, pytorch, scikit-learn

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'german-center-ai');

UPDATE organizations SET repo_path = 'git/git' WHERE slug = 'git';
UPDATE playbooks SET content_markdown = '### Welcome to Git!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** shell script, git, c language

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/git/git)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'git');

UPDATE playbooks SET content_markdown = '### Welcome to Global Alliance for Genomics and Health!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, postgresql, java, react, rust

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'ga4gh');

UPDATE playbooks SET content_markdown = '### Welcome to GNOME Foundation!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** c, linux, rust, gtk, Flatpak

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'gnome');

UPDATE playbooks SET content_markdown = '### Welcome to GNU Compiler Collection (GCC)!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** c/c++, gnu make, gnu autotools

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'gcc');

UPDATE playbooks SET content_markdown = '### Welcome to GNU Image Manipulation Program!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** c, GEGL

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'gimp');

UPDATE playbooks SET content_markdown = '### Welcome to GNU Mailman!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, django, rest, sqlalchemy, zope

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'mailman');

UPDATE playbooks SET content_markdown = '### Welcome to GNU Octave!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** c++, hg

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'octave');

UPDATE playbooks SET content_markdown = '### Welcome to GNU Project!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** c, c++, gcc, autotools, GNU

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'gnu');

UPDATE organizations SET repo_path = 'gnuradio/gnuradio' WHERE slug = 'gnu-radio';
UPDATE playbooks SET content_markdown = '### Welcome to GNU Radio!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, c++, qt, simd

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/gnuradio/gnuradio)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'gnu-radio');

UPDATE organizations SET repo_path = 'gprMax/gprMax' WHERE slug = 'gprmax';
UPDATE playbooks SET content_markdown = '### Welcome to gprMax!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, cuda, openmp, mpi, opencl

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/gprMax/gprMax)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'gprmax');

UPDATE organizations SET repo_path = 'grame-cncm/faust' WHERE slug = 'grame';
UPDATE playbooks SET content_markdown = '### Welcome to GRAME!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** c, javascript, c++, rust, typescript

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/grame-cncm/faust)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'grame');

UPDATE playbooks SET content_markdown = '### Welcome to Graphite!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** rust, vulkan, webgpu

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'graphite');

UPDATE playbooks SET content_markdown = '### Welcome to Haiku!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** c++, posix, unix

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://www.haiku-os.org/guides/building/get-source-git)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'haiku');

UPDATE playbooks SET content_markdown = '### Welcome to Haskell.org!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** haskell, ghc

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'haskell');

UPDATE playbooks SET content_markdown = '### Welcome to HumanAI!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, machine learning, c++, data analysis, artificial intelligence

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/humanai-foundation)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'humanai');

UPDATE playbooks SET content_markdown = '### Welcome to INCF!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, javascript, java, c++, gpu

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/INCF)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'incf');

UPDATE playbooks SET content_markdown = '### Welcome to International Catrobat Association!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, javascript, swift, kotlin, flutter

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'catrobat');

UPDATE playbooks SET content_markdown = '### Welcome to Internet Archive!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, javascript, go, elasticsearch, hadoop

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/internetarchive)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'internet-archive');

UPDATE organizations SET repo_path = 'invesalius/invesalius3' WHERE slug = 'invesalius';
UPDATE playbooks SET content_markdown = '### Welcome to Invesalius!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, cython, numpy, dicom, Vtk

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/invesalius/invesalius3)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'invesalius');

UPDATE playbooks SET content_markdown = '### Welcome to IOOS!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, java, r, Zarr, NetCDF

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/ioos)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'ioos');

UPDATE playbooks SET content_markdown = '### Welcome to JabRef e.V.!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** java, javafx, ai, bibtex

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'jabref');

UPDATE playbooks SET content_markdown = '### Welcome to JBoss Community!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** java, react, golang, cloud

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'jboss');

UPDATE playbooks SET content_markdown = '### Welcome to JdeRobot!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, ros, gazebo, opencv, tensorflow

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/jderobot)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'jderobot');

UPDATE playbooks SET content_markdown = '### Welcome to Jenkins!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** javascript, java, go, docker, kubernetes

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'jenkins');

UPDATE playbooks SET content_markdown = '### Welcome to Jitsi!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** javascript, java, react, kotlin, webrtc

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/jitsi/)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'jitsi');

UPDATE organizations SET repo_path = 'joomla/joomla-cms' WHERE slug = 'joomla';
UPDATE playbooks SET content_markdown = '### Welcome to Joomla!!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** mysql, javascript, html, php, ai

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/joomla/joomla-cms)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'joomla');

UPDATE organizations SET repo_path = 'laurent22/joplin' WHERE slug = 'joplin';
UPDATE playbooks SET content_markdown = '### Welcome to Joplin!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** javascript, react, typescript, electron, React-Native

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/laurent22/joplin/)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'joplin');

UPDATE playbooks SET content_markdown = '### Welcome to JSON Schema!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, javascript, typescript, .net, JSON Schema

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/json-schema-org)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'json-schema');

UPDATE playbooks SET content_markdown = '### Welcome to KDE Community!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** c++, qt, qml, data structures

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'kde');

UPDATE playbooks SET content_markdown = '### Welcome to Kiwix!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, c++, nodejs, kotlin, vue.js

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://www.github.com/kiwix)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'kiwix');

UPDATE playbooks SET content_markdown = '### Welcome to KolibriOS Project Team!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** c, assembly, asm, fasm, pci

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'kolibrios');

UPDATE playbooks SET content_markdown = '### Welcome to Konflux!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, go, docker, kubernetes, tekton

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/konflux-ci)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'konflux');

UPDATE organizations SET repo_path = 'kornia/kornia-rs' WHERE slug = 'kornia';
UPDATE playbooks SET content_markdown = '### Welcome to Kornia!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** cuda, rust, deep learning, data science, Spatial AI

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/kornia/kornia-rs)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'kornia');

UPDATE playbooks SET content_markdown = '### Welcome to Kotlin Foundation!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** gradle, kotlin, jvm, Parsers & Compilers, Multiplatform

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'kotlin');

UPDATE playbooks SET content_markdown = '### Welcome to Kubeflow!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, go, kubernetes, typescript, YAML

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/kubeflow)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'kubeflow');

UPDATE playbooks SET content_markdown = '### Welcome to KubeVirt!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** golang, grpc

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/kubevirt)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'kubevirt');

UPDATE playbooks SET content_markdown = '### Welcome to LabLua!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** lua, luarocks, kernel, lunatik, pallene

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](http://www.lua.inf.puc-rio.br/projects.html)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'lablua');

UPDATE organizations SET repo_path = 'learningequality/kolibri' WHERE slug = 'learning-equality';
UPDATE playbooks SET content_markdown = '### Welcome to Learning Equality!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, javascript, django, vue.js

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/learningequality/kolibri)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'learning-equality');

UPDATE playbooks SET content_markdown = '### Welcome to Learning Unlimited!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, javascript, django, html, css

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/learning-unlimited)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'learning-unlimited');

UPDATE playbooks SET content_markdown = '### Welcome to LibreCube Initiative!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, docker, raspberry pi, micropython

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'librecube');

UPDATE playbooks SET content_markdown = '### Welcome to LibreHealth!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, javascript, android, java, dart/flutter

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://gitlab.com/librehealth)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'librehealth');

UPDATE playbooks SET content_markdown = '### Welcome to LibreOffice!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, java, c++

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://www.libreoffice.org/about-us/source-code/)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'libreoffice');

UPDATE playbooks SET content_markdown = '### Welcome to libssh!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** c, git, ci, ssh, sftp

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://git.libssh.org/projects/libssh.git)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'libssh');

UPDATE playbooks SET content_markdown = '### Welcome to Liquid Galaxy project!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** linux, android, nodejs, flutter, Google Earth

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'liquid-galaxy');

UPDATE playbooks SET content_markdown = '### Welcome to LLVM Compiler Infrastructure!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** llvm, c++, clang, mlir

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'llvm');

UPDATE playbooks SET content_markdown = '### Welcome to Machine Learning for Science (ML4SCI)!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, machine learning, c++, data analysis, artificial intelligence

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'ml4sci');

UPDATE playbooks SET content_markdown = '### Welcome to MalariaGEN!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, GCS

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/malariagen/)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'malariagen');

UPDATE organizations SET repo_path = 'MariaDB/server' WHERE slug = 'mariadb';
UPDATE playbooks SET content_markdown = '### Welcome to MariaDB!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, javascript, c/c++, perl, databases

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/MariaDB/server)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'mariadb');

UPDATE organizations SET repo_path = 'MDAnalysis/mdanalysis' WHERE slug = 'mdanalysis';
UPDATE playbooks SET content_markdown = '### Welcome to MDAnalysis!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, cython, c/c++

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/MDAnalysis/mdanalysis)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'mdanalysis');

UPDATE playbooks SET content_markdown = '### Welcome to Measurement Lab!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, javascript, html, sql, css

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'm-lab');

UPDATE playbooks SET content_markdown = '### Welcome to Meshery!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** javascript, golang, kubernetes, ai, visual design

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/meshery)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'meshery');

UPDATE playbooks SET content_markdown = '### Welcome to MetaBrainz Foundation Inc!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, machine learning, perl, postgres, spark

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'metabrainz');

UPDATE playbooks SET content_markdown = '### Welcome to MetaCall!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, c++, rust, nodejs, docker

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/metacall)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'metacall');

UPDATE organizations SET repo_path = 'Netflix/metaflow' WHERE slug = 'metaflow';
UPDATE playbooks SET content_markdown = '### Welcome to Metaflow!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, javascript, kubernetes

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/Netflix/metaflow)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'metaflow');

UPDATE organizations SET repo_path = 'rapid7/metasploit-framework' WHERE slug = 'metasploit';
UPDATE playbooks SET content_markdown = '### Welcome to Metasploit!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** c, python, postgresql, ruby, assembly

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/rapid7/metasploit-framework)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'metasploit');

UPDATE organizations SET repo_path = 'mit-cml/appinventor-sources' WHERE slug = 'mit-app-inventor';
UPDATE playbooks SET content_markdown = '### Welcome to MIT App Inventor!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** javascript, java, gwt, swift

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/mit-cml/appinventor-sources)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'mit-app-inventor');

UPDATE organizations SET repo_path = 'mixxxdj/mixxx' WHERE slug = 'mixxx';
UPDATE playbooks SET content_markdown = '### Welcome to Mixxx!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** javascript, c++, qt, pytorch, onnx

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/mixxxdj/mixxx)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'mixxx');

UPDATE organizations SET repo_path = 'mllam/neural-lam' WHERE slug = 'mllam';
UPDATE playbooks SET content_markdown = '### Welcome to MLLAM!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, numpy, pytorch, xarray, Zarr

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/mllam/neural-lam)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'mllam');

UPDATE playbooks SET content_markdown = '### Welcome to MoFA Org!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, rust

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'mofa');

UPDATE organizations SET repo_path = 'XmacsLabs/mogan' WHERE slug = 'moganlab';
UPDATE playbooks SET content_markdown = '### Welcome to MoganLab!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** c++, qt, scheme

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/XmacsLabs/mogan)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'moganlab');

UPDATE playbooks SET content_markdown = '### Welcome to National Resource for Network Biology (NRNB)!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, javascript, html, css, LLM

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'nrnb');

UPDATE organizations SET repo_path = 'neovim/neovim' WHERE slug = 'neovim';
UPDATE playbooks SET content_markdown = '### Welcome to Neovim!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** c, lua

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/neovim/neovim)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'neovim');

UPDATE playbooks SET content_markdown = '### Welcome to Neuroinformatics Unit!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, numpy, pytorch, Scipy, napari

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'niu');

UPDATE playbooks SET content_markdown = '### Welcome to Neutralinojs!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** c, javascript, node.js, c++, typescript

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/neutralinojs)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'neutralinojs');

UPDATE playbooks SET content_markdown = '### Welcome to NixOS Foundation!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** git, nix

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'nixos');

UPDATE organizations SET repo_path = 'numfocus/gsoc#organizations-confirmed-under-numfocus-umbrella' WHERE slug = 'numfocus';
UPDATE playbooks SET content_markdown = '### Welcome to NumFOCUS!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, c++, r, julia

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/numfocus/gsoc#organizations-confirmed-under-numfocus-umbrella)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'numfocus');

UPDATE playbooks SET content_markdown = '### Welcome to omegaUp!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, mysql, php, typescript, vue.js

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/omegaup)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'omegaup');

UPDATE playbooks SET content_markdown = '### Welcome to Open Food Facts!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, javascript, machine learning, perl, flutter

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'openfoodfacts');

UPDATE playbooks SET content_markdown = '### Welcome to Open Genome Informatics!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, react, r-project, graph, angular

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](http://gmod.org/wiki/Source_Code_Repositories)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'open-genome-informatics');

UPDATE playbooks SET content_markdown = '### Welcome to Open HealthCare Network!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, django, react, typescript, NextJs

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'ohcn');

UPDATE playbooks SET content_markdown = '### Welcome to Open Robotics!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, ros, gazebo, c++, Bevy

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'osrf');

UPDATE playbooks SET content_markdown = '### Welcome to Open Science Initiative for Perfusion Imaging!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, github

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'osipi');

UPDATE playbooks SET content_markdown = '### Welcome to Open Science Labs!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, javascript, llvm, c++, docker

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'osl');

UPDATE playbooks SET content_markdown = '### Welcome to Open Technologies Alliance - GFOSS!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** javascript, c/c++, nodejs, python 3, Machine Learning (ML)

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'gfoss');

UPDATE playbooks SET content_markdown = '### Welcome to Open Transit Software Foundation!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** android, java, golang, docker, ios

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'otsf');

UPDATE playbooks SET content_markdown = '### Welcome to OpenAFS!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** c, python, javascript, git, tcp/udp

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://git.openafs.org/?p=openafs.git;a=summary)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'openafs');

UPDATE playbooks SET content_markdown = '### Welcome to OpenAstronomy!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** c, python, c++, julia

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](http://openastronomy.org/members/)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'openastronomy');

UPDATE playbooks SET content_markdown = '### Welcome to OpenELIS Global!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** postgresql, javascript, java, react, spring

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'openelis');

UPDATE playbooks SET content_markdown = '### Welcome to OpenMRS!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** mysql, javascript, java, reactjs, fhir

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/openmrs)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'openmrs');

UPDATE playbooks SET content_markdown = '### Welcome to OpenMS Inc!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, cython, c++, pytorch, Streamlit

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'openms');

UPDATE playbooks SET content_markdown = '### Welcome to OpenStreetMap!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, javascript, c++, docker, glTF

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/openstreetmap/)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'openstreetmap');

UPDATE playbooks SET content_markdown = '### Welcome to openSUSE Project!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, c/c++, go, ruby, reactjs javascript

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'opensuse');

UPDATE playbooks SET content_markdown = '### Welcome to OpenVINO Toolkit!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, c++, arm, x86

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'openvino');

UPDATE playbooks SET content_markdown = '### Welcome to OpenWISP!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, javascript, django, lua, openwrt

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/openwisp)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'openwisp');

UPDATE playbooks SET content_markdown = '### Welcome to Oppia Foundation!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, google app engine, angular, typescript, Apache Beam

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'oppia');

UPDATE playbooks SET content_markdown = '### Welcome to OSGeo (Open Source Geospatial Foundation)!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** c, python, javascript, java, c++

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'osgeo');

UPDATE playbooks SET content_markdown = '### Welcome to OWASP Foundation!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, javascript, java, ZAP, Juice Shop

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'owasp');

UPDATE playbooks SET content_markdown = '### Welcome to  PEcAn Project!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** r, docker, api, geospatial

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'pecan');

UPDATE playbooks SET content_markdown = '### Welcome to Pharo Consortium!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** git, smalltalk, pharo, spec, SUnit

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'pharo');

UPDATE playbooks SET content_markdown = '### Welcome to PostgreSQL!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** c, python, postgresql, javascript, go

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://git.postgresql.org/gitweb/?p=postgresql.git;a=summary)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'postgresql');

UPDATE playbooks SET content_markdown = '### Welcome to preCICE!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** c, python, shell, c++

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/precice/)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'precice');

UPDATE playbooks SET content_markdown = '### Welcome to Processing Foundation!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** javascript, java, typescript, webgl, GitHub Actions

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'processing');

UPDATE organizations SET repo_path = 'projectmesa/mesa' WHERE slug = 'project-mesa';
UPDATE playbooks SET content_markdown = '### Welcome to Project Mesa!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, gis, object oriented programming, LLMs, network topology

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/projectmesa/mesa)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'project-mesa');

UPDATE playbooks SET content_markdown = '### Welcome to Python Software Foundation!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, javascript

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'python');

UPDATE playbooks SET content_markdown = '### Welcome to QC-Devs!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, github, c++, julia, jupyter

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/theochem)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'qc-devs');

UPDATE playbooks SET content_markdown = '### Welcome to QEMU!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** c, python, linux, rust

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://gitlab.com/qemu-project/qemu)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'qemu');

UPDATE playbooks SET content_markdown = '### Welcome to Qubes OS!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** c, python, xen

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'qubes');

UPDATE playbooks SET content_markdown = '### Welcome to R project for statistical computing!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** c, javascript, c++, r-project, fortran

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'r-project');

UPDATE playbooks SET content_markdown = '### Welcome to Rizin!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** c, python, go, c++, qt

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/rizinorg)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'rizin');

UPDATE playbooks SET content_markdown = '### Welcome to rocket.chat!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** javascript, typescript, node, LLM, generative ai

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'rocket-chat');

UPDATE playbooks SET content_markdown = '### Welcome to RTEMS Project!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, c/c++, assembly, posix

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'rtems');

UPDATE playbooks SET content_markdown = '### Welcome to Ruby!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** c, java, ruby on rails, ruby, rubygems

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/ruby)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'ruby');

UPDATE playbooks SET content_markdown = '### Welcome to SageMath!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, cython

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://git.sagemath.org/sage.git/)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'sagemath');

UPDATE playbooks SET content_markdown = '### Welcome to ScummVM!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, opengl, c++, assembly, sdl

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/scummvm/)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'scummvm');

UPDATE playbooks SET content_markdown = '### Welcome to St. Jude Children''s Research Hospital!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, rust, simd, WDL

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'st-jude');

UPDATE organizations SET repo_path = 'stdlib-js/stdlib' WHERE slug = 'stdlib';
UPDATE playbooks SET content_markdown = '### Welcome to stdlib!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** c, javascript, node.js, typescript, webassembly

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/stdlib-js/stdlib)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'stdlib');

UPDATE playbooks SET content_markdown = '### Welcome to Ste||ar group!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** c++, hpc

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'stellar-group');

UPDATE playbooks SET content_markdown = '### Welcome to Stichting SU2!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, c++

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'su2');

UPDATE playbooks SET content_markdown = '### Welcome to Submitty!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, postgresql, javascript, c++, php

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/Submitty)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'submitty');

UPDATE playbooks SET content_markdown = '### Welcome to Sugar Labs!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, gtk, typescript, javascipt, LLM

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/sugarlabs)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'sugar-labs');

UPDATE organizations SET repo_path = 'eclipse-sw360/sw360' WHERE slug = 'sw360';
UPDATE playbooks SET content_markdown = '### Welcome to SW360!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** java, react, couchdb, SpringBoot

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/eclipse-sw360/sw360)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'sw360');

UPDATE organizations SET repo_path = 'apple/swift' WHERE slug = 'swift';
UPDATE playbooks SET content_markdown = '### Welcome to Swift!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** c++, cmake, swift

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/apple/swift)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'swift');

UPDATE organizations SET repo_path = 'sympy/sympy' WHERE slug = 'sympy';
UPDATE playbooks SET content_markdown = '### Welcome to SymPy!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, numpy, jupyter

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/sympy/sympy)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'sympy');

UPDATE organizations SET repo_path = 'synfig/synfig' WHERE slug = 'synfig';
UPDATE playbooks SET content_markdown = '### Welcome to Synfig!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, c++, gtk, gtkmm

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/synfig/synfig)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'synfig');

UPDATE playbooks SET content_markdown = '### Welcome to TARDIS RT Collaboration!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, numba, numpy, jupyter, pandas

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'tardis-rt');

UPDATE playbooks SET content_markdown = '### Welcome to The FreeBSD Project!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** c, llvm, assembly, make, POSIX shell

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'freebsd');

UPDATE playbooks SET content_markdown = '### Welcome to The Honeynet Project!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, javascript, django, go, docker

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'honeynet');

UPDATE playbooks SET content_markdown = '### Welcome to The JPF team!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** android, java, distributed systems, jvm

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'jpf');

UPDATE playbooks SET content_markdown = '### Welcome to The Julia Language!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** machine learning, julia, data science, compilers, garbage-collection

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'julia');

UPDATE playbooks SET content_markdown = '### Welcome to The Libreswan Project!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** c, kernel, nss, RFCs, libevent

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'libreswan');

UPDATE playbooks SET content_markdown = '### Welcome to The Linux Foundation!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** c, linux, cups, ai, fuzz-testing

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'linux-foundation');

UPDATE playbooks SET content_markdown = '### Welcome to The Mifos Initiative!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** android, java, kotlin, spring, angular

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'mifos');

UPDATE playbooks SET content_markdown = '### Welcome to The NetBSD Foundation!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** c, shell script, make, unix, bsd

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'netbsd');

UPDATE playbooks SET content_markdown = '### Welcome to The ns-3 Network Simulator Project!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, django, c++

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'ns-3');

UPDATE playbooks SET content_markdown = '### Welcome to The OpenROAD Initiative!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, verilog, c++, tcl, OpenRoad

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'openroad');

UPDATE playbooks SET content_markdown = '### Welcome to The P4 Language Consortium!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** llvm, c++, linux kernel, mlir, ebpf

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'p4');

UPDATE playbooks SET content_markdown = '### Welcome to The Rust Foundation!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, rust

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'rust-foundation');

UPDATE organizations SET repo_path = 'mapeditor/tiled' WHERE slug = 'tiled';
UPDATE playbooks SET content_markdown = '### Welcome to Tiled!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** c++, qt

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/mapeditor/tiled)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'tiled');

UPDATE playbooks SET content_markdown = '### Welcome to Typelevel!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** linux, node.js, jvm, scala, wasm

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/typelevel)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'typelevel');

UPDATE playbooks SET content_markdown = '### Welcome to UC OSPO!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, javascript, c/c++, machine learning, pytorch

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'uc-ospo');

UPDATE playbooks SET content_markdown = '### Welcome to Unikraft!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** c, xen, golang, kvm, assembly language

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/unikraft/)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'unikraft');

UPDATE playbooks SET content_markdown = '### Welcome to United Nations Office of Information Communication Technology!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, javascript, css

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'un-oict');

UPDATE playbooks SET content_markdown = '### Welcome to Uramaki LAB!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, javascript, html, css, Firebase

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/ruxailab)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'uramaki-lab');

UPDATE playbooks SET content_markdown = '### Welcome to VideoLAN!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** c, c++, qt, assembly, video

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://code.videolan.org/videolan/)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'videolan');

UPDATE organizations SET repo_path = 'wagtail/wagtail' WHERE slug = 'wagtail';
UPDATE playbooks SET content_markdown = '### Welcome to Wagtail!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, javascript, django

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/wagtail/wagtail)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'wagtail');

UPDATE playbooks SET content_markdown = '### Welcome to webpack!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** javascript, typescript, node

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/webpack)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'webpack');

UPDATE playbooks SET content_markdown = '### Welcome to Wikimedia Foundation!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** javascript, html, php, css, Phyton

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](#)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'wikimedia');

UPDATE organizations SET repo_path = 'zulip/zulip' WHERE slug = 'zulip';
UPDATE playbooks SET content_markdown = '### Welcome to Zulip!

This organization is part of **Google Summer of Code 2027**.

**Technologies used:** python, django, flutter, css, typescript

#### How to get started:
1. **Explore the codebase:** Check out their [Source Repository](https://github.com/zulip/zulip)
2. **Setup your environment:** Look for a `README.md` or `CONTRIBUTING.md` file in the repository.
3. **Find an issue:** Look for "Good First Issues" below to start your contribution journey.
4. **Join the community:** Check the organization''s website for communication channels (Slack, Discord, Mailing List).

Happy coding!
' WHERE org_id = (SELECT id FROM organizations WHERE slug = 'zulip');

COMMIT;