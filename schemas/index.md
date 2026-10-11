---
layout: default
title: Schemas
description: Machine-readable JSON Schemas for every SGM protocol object.
---

<section class="section">
  <div class="page">
    <div class="section-head">
      <p class="kicker">Schemas</p>
      <h1>JSON Schemas</h1>
      <p class="lead">Normative for structure. The <a href="{{ '/spec/' | relative_url }}">specification</a> is normative for semantics.</p>
    </div>

    <div class="article-body" style="margin-top:32px">
      <p>Schemas describe the <strong>logical object</strong>, never a physical storage table. An implementation MUST NOT leak its internal schema into protocol objects. All schemas use JSON Schema draft 2020-12 and live in <a href="https://github.com/Thairux/sgm/tree/main/schemas" target="_blank" rel="noopener noreferrer"><code>schemas/</code></a>.</p>

      <table>
        <thead><tr><th>Schema</th><th>Object</th><th>Spec</th></tr></thead>
        <tbody>
          <tr><td><code>memory.schema.json</code></td><td>Memory record</td><td><a href="{{ '/spec/memory/' | relative_url }}">memory.md</a></td></tr>
          <tr><td><code>context.schema.json</code></td><td>Assembled context</td><td><a href="{{ '/spec/context/' | relative_url }}">context.md</a></td></tr>
          <tr><td><code>annotation.schema.json</code></td><td>Annotation</td><td><a href="{{ '/spec/annotations/' | relative_url }}">annotations.md</a></td></tr>
          <tr><td><code>handoff.schema.json</code></td><td>Handoff record</td><td><a href="{{ '/spec/handoffs/' | relative_url }}">handoffs.md</a></td></tr>
          <tr><td><code>capability.schema.json</code></td><td>Capability discovery</td><td><a href="{{ '/spec/capabilities/' | relative_url }}">capabilities.md</a></td></tr>
        </tbody>
      </table>

      <h2>Every protocol object defines</h2>
      <ul>
        <li>identity</li>
        <li>type</li>
        <li>schema version</li>
        <li>scope</li>
        <li>timestamps</li>
        <li>provenance</li>
        <li>content / reference</li>
        <li>metadata</li>
        <li>relationships where applicable</li>
      </ul>
    </div>
  </div>
</section>
