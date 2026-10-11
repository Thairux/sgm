---
layout: default
title: Conformance
description: The SGM conformance suite — behavioral tests any implementation can run.
---

<section class="section">
  <div class="page">
    <div class="section-head">
      <p class="kicker">Conformance</p>
      <h1>Conformance Suite</h1>
      <p class="lead">"Does my implementation actually implement SGM correctly?"</p>
    </div>

    <div class="article-body" style="margin-top:32px">
      <p>Tests focus on <strong>externally observable behavior</strong> — what a client can see — not internal functions or database structure. An implementation is <strong>conformant</strong> for a capability if it passes every test in that capability's suite.</p>

      <h2>Run it</h2>
      <pre><code>sgm conformance                # all suites
sgm conformance core           # core only
sgm conformance retrieval      # one capability profile
sgm conformance --endpoint URL # test a remote implementation</code></pre>

      <h2>Suites</h2>
      <table>
        <thead><tr><th>Suite</th><th>Capability</th><th>Tests</th></tr></thead>
        <tbody>
          <tr><td><a href="{{ '/conformance/core/' | relative_url }}">Core</a></td><td>store, retrieve, read, identity, scope, discovery</td><td>C1–C12</td></tr>
          <tr><td><a href="{{ '/conformance/retrieval/' | relative_url }}">Retrieval</a></td><td>pagination, context, round-trip</td><td>R1–R10</td></tr>
          <tr><td><a href="{{ '/conformance/handoff/' | relative_url }}">Handoff</a></td><td>handoff fidelity</td><td>H1–H6</td></tr>
          <tr><td><a href="{{ '/conformance/annotations/' | relative_url }}">Annotations</a></td><td>annotation fidelity</td><td>A1–A7</td></tr>
          <tr><td><a href="{{ '/conformance/security/' | relative_url }}">Security</a></td><td>isolation, provenance integrity</td><td>S1–S9</td></tr>
        </tbody>
      </table>

      <p>Passing <strong>core</strong> is mandatory for calling oneself an SGM implementation; optional capabilities are conformant independently. The full suite and the Given/When/Then form live in <a href="https://github.com/Thairux/sgm/tree/main/conformance" target="_blank" rel="noopener noreferrer"><code>conformance/</code></a>.</p>
    </div>
  </div>
</section>
