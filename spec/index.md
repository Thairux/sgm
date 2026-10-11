---
layout: default
title: Specification
description: The authoritative SGM protocol specification.
---

<section class="section">
  <div class="page">
    <div class="section-head">
      <p class="kicker">Specification</p>
      <h1>The SGM Specification</h1>
      <p class="lead">Where the specification and the reference implementation disagree, the specification wins.</p>
    </div>

    <div class="article-body" style="margin-top:32px">
      <p>The key words <strong>MUST</strong>, <strong>SHOULD</strong>, <strong>MAY</strong> etc. are interpreted as in <a href="https://www.rfc-editor.org/rfc/rfc2119" target="_blank" rel="noopener noreferrer">RFC 2119</a>. Every structured object has a machine-readable <a href="{{ '/schemas/' | relative_url }}">JSON Schema</a> — the prose is normative for semantics, the schemas for structure.</p>

      <table>
        <thead><tr><th>#</th><th>Document</th><th>Defines</th></tr></thead>
        <tbody>
          <tr><td>1</td><td><a href="{{ '/spec/overview/' | relative_url }}">Overview</a></td><td>What SGM is, the problem it solves, the layer model</td></tr>
          <tr><td>2</td><td><a href="{{ '/spec/terminology/' | relative_url }}">Terminology</a></td><td>The protocol vocabulary</td></tr>
          <tr><td>3</td><td><a href="{{ '/spec/architecture/' | relative_url }}">Architecture</a></td><td>Spec / schemas / conformance / reference split</td></tr>
          <tr><td>4</td><td><a href="{{ '/spec/memory/' | relative_url }}">Memory</a></td><td>The memory record model</td></tr>
          <tr><td>5</td><td><a href="{{ '/spec/retrieval/' | relative_url }}">Retrieval</a></td><td>The retrieval contract</td></tr>
          <tr><td>6</td><td><a href="{{ '/spec/context/' | relative_url }}">Context</a></td><td>The assembled context object</td></tr>
          <tr><td>7</td><td><a href="{{ '/spec/annotations/' | relative_url }}">Annotations</a></td><td>Decisions, rules, status, tasks</td></tr>
          <tr><td>8</td><td><a href="{{ '/spec/handoffs/' | relative_url }}">Handoffs</a></td><td>Cross-tool resumable work packages</td></tr>
          <tr><td>9</td><td><a href="{{ '/spec/provenance/' | relative_url }}">Provenance</a></td><td>Mandatory who/what/when/where metadata</td></tr>
          <tr><td>10</td><td><a href="{{ '/spec/scopes/' | relative_url }}">Scopes</a></td><td>Scope model and isolation</td></tr>
          <tr><td>11</td><td><a href="{{ '/spec/capabilities/' | relative_url }}">Capabilities</a></td><td>Core vs optional profiles; discovery</td></tr>
          <tr><td>12</td><td><a href="{{ '/spec/versioning/' | relative_url }}">Versioning</a></td><td>Protocol vs implementation versioning</td></tr>
          <tr><td>13</td><td><a href="{{ '/spec/errors/' | relative_url }}">Errors</a></td><td>The error model</td></tr>
          <tr><td>14</td><td><a href="{{ '/spec/security/' | relative_url }}">Security</a></td><td>Sensitivity, authorization, licensing</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>
