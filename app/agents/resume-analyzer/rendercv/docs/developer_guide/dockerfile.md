---
toc_depth: 3
---

# Dockerfile

## What is Docker?

Docker lets software carry **its entire working environment** with it: the right language runtime, libraries, and configuration, all bundled into a single file called an *image*. Think of an image as a **frozen filesystem where everything is already installed and configured correctly**.

When you run an image, Docker creates a **container**: a live, isolated instance of that environment running on your machine. When you're done, you can delete it without a trace. Your actual system stays untouched.

## Why Docker for Superplaced AI CV?

Superplaced AI CV installs easily with `pip install superplaced-cv` if you have Python. Most users don't need Docker.

But Docker makes sense if you want:

- **No installation at all** — no Python, no packages, nothing added to your system
- **A reproducible environment** — the exact same setup on every machine, every time
- **To bypass restrictions** — some systems block software installation but allow containers

The Superplaced AI CV Docker image is a ready-made environment with Python and Superplaced AI CV pre-installed. Just run:
```bash
docker run --rm -v "$PWD":/work -u $(id -u):$(id -g) -e HOME=/tmp -w /work ghcr.io/superplaced-cv/superplaced-cv new "Your Name"
```

## How the Image Gets Published

Docker images are stored in **registries**, which are servers that host images so anyone can download and run them. Docker Hub is the most popular, but GitHub has its own called GitHub Container Registry (GHCR).

When Superplaced AI CV publishes a GitHub release, the [`release.yaml` workflow](https://github.com/superplaced-cv/superplaced-cv/blob/main/.github/workflows/release.yaml) automatically builds and publishes the Superplaced AI CV image to GHCR at `ghcr.io/superplaced-cv/superplaced-cv`.

When users run `docker run ghcr.io/superplaced-cv/superplaced-cv`, Docker automatically pulls the image from the registry if it's not already on their machine.

## Learn More

To learn more about writing `Dockerfile`, see the `uv`'s guide on [Docker](https://docs.astral.sh/uv/guides/integration/docker/).
