---
layout: default
title: Reference
description: The SGM reference implementation — executable documentation.
---

<section class="section">
  <div class="page">
    <div class="section-head">
      <p class="kicker">Reference</p>
      <h1>Reference Implementation</h1>
      <p class="lead">Executable documentation. The specification is authoritative; this only demonstrates it.</p>
    </div>

    <div class="article-body" style="margin-top:32px">
      <p>A minimal, dependency-light implementation that serves as <strong>executable documentation</strong>. It is NOT the protocol. A production implementation would persist, index, rank, and secure; this one proves the observable contract.</p>

      <h2>What it demonstrates</h2>
      <ul>
        <li>Scope containment and isolation</li>
        <li>Store idempotency by identity</li>
        <li>Immutable <code>created_at</code> + <code>modified</code> tracking on update</li>
        <li>Unknown-type / metadata lossless round-trip</li>
        <li><code>scope_denied</code> on unauthorized cross-scope retrieval</li>
        <li>Capability discovery with <code>protocol_version</code></li>
      </ul>

      <h2>Usage</h2>
      <pre><code>sgm discover
sgm store fact-hello --type fact --scope project=demo --content "SGM works."
sgm retrieve --scope project=demo --text "SGM"
sgm conformance</code></pre>

      <p>The source lives in <a href="https://github.com/Thairux/sgm/tree/main/reference" target="_blank" rel="noopener noreferrer"><code>reference/</code></a> — an in-memory <code>SgmStore</code> plus a CLI. It passes the core conformance checks (7/7).</p>
    </div>
  </div>
</section>
