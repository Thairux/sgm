---
layout: home

hero:
  name: "SGM"
  text: "Shared Global Memory"
  tagline: An open protocol for persistent, interoperable memory and context sharing between AI agents and software tools.
  actions:
    - theme: brand
      text: Read the Specification
      link: /spec/overview
    - theme: alt
      text: Getting Started
      link: /docs/getting-started

features:
  - title: Protocol first
    details: The specification is authoritative. A third party can implement SGM from the public spec alone, without reading any implementation's source.
  - title: Transport independent
    details: MCP, HTTP, and CLI are supported bindings — never the protocol. The same implementation works across all of them.
  - title: Provenance everywhere
    details: Every record carries who/what/when/where, so agents can tell a fact from a decision from a stale status.
  - title: Scope isolation
    details: Memory is shared across your tools, never world-readable. Isolation is mandatory and enforced.
  - title: Testable conformance
    details: A behavioral suite answers "does my implementation actually implement SGM correctly?" — interoperability you can verify.
  - title: Small, strong core
    details: Store, Retrieve, Read, Identity, Scope, Discovery. Everything else is an optional, advertised capability.
---
