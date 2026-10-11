---
layout: default
title: SGM
description: Shared Global Memory — an open protocol for persistent, interoperable memory and context sharing between AI agents and software tools.
---

<section class="section">
  <div class="page">
    <div class="section-head">
      <p class="kicker">Open protocol</p>
      <h1>SGM — Shared Global Memory</h1>
      <p class="lead">An open protocol for persistent, interoperable memory and context sharing between AI agents and software tools.</p>
      <div class="project-stack" style="margin-top:16px">
        <span>Protocol</span><span>JSON Schema</span><span>MCP</span><span>AGPL-3.0</span><span>Spec 0.1.0</span>
      </div>
    </div>

    <p style="margin-top:24px">
      Every AI tool keeps its own private, session-scoped memory. Switch tools, start a new session,
      or hand work to another agent, and that context is lost — rebuilt by hand every time. SGM is the
      shared contract that fixes it: a small, transport-independent protocol any conforming
      implementation can use to exchange memory with any other.
    </p>
    <p style="margin-top:12px">
      <strong>SGM is a protocol first, an implementation second.</strong> The specification is
      authoritative; the reference implementation is executable documentation only. A third party can
      implement SGM from the public spec alone, without reading any implementation's source.
    </p>
  </div>
</section>

<section class="section">
  <div class="page">
    <div class="section-head">
      <p class="kicker">Explore</p>
      <h2>The protocol</h2>
    </div>
    <div class="projects-grid">
      <div class="project-card">
        <span class="badge">Specification</span>
        <h3><a href="{{ '/spec/' | relative_url }}">14 spec documents</a></h3>
        <p>Overview, terminology, architecture, memory, retrieval, context, annotations, handoffs, provenance, scopes, capabilities, versioning, errors, and security.</p>
      </div>
      <div class="project-card">
        <span class="badge">Schemas</span>
        <h3><a href="{{ '/schemas/' | relative_url }}">5 JSON Schemas</a></h3>
        <p>Machine-readable structures for memory records, contexts, annotations, handoffs, and capability discovery — draft 2020-12.</p>
      </div>
      <div class="project-card">
        <span class="badge">Conformance</span>
        <h3><a href="{{ '/conformance/' | relative_url }}">44 behavioral tests</a></h3>
        <p>Core, retrieval, handoff, annotations, and security suites that answer "does my implementation actually implement SGM correctly?"</p>
      </div>
      <div class="project-card">
        <span class="badge">Reference</span>
        <h3><a href="{{ '/reference/' | relative_url }}">Executable docs</a></h3>
        <p>An in-memory reference store and CLI that demonstrate the contract and pass the conformance suite.</p>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="page">
    <div class="now-panel">
      <div class="now-head"><h3><span class="pulse"></span> Core capabilities</h3></div>
      <div class="now-body">
        <ul>
          <li><strong>Store · Retrieve · Read · Identity · Scope · Discovery</strong> — the mandatory core</li>
          <li>Optional profiles: <strong>Collaboration</strong>, <strong>Code Intelligence</strong>, <strong>History</strong>, <strong>Transport</strong></li>
          <li>Transport-independent — MCP, HTTP, and CLI are bindings, never the protocol</li>
        </ul>
      </div>
    </div>
  </div>
</section>
