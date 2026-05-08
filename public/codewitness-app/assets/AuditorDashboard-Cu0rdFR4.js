import{r as e}from"./rolldown-runtime-Dw2cE7zH.js";import{d as t,p as n}from"./vendor-flow-Cp5Fj48q.js";import{n as r}from"./vendor-query-CFBISzv4.js";import{Et as i,Tt as a,Z as o,a as s,jt as c,ot as l,xt as u}from"./api-Bbpg7RUE.js";import{f as d,h as f,m as p,n as m,r as h,s as g,t as _}from"./design-system-Bhf8b1CM.js";import{c as v}from"./chunk-LFPYN7LY-DJ59zUHB.js";import{C as y,V as b,_ as x,bt as S,d as C,g as w,gt as T,h as E,it as D,l as ee,mt as te,ot as O,p as k,pt as A,u as ne,ut as j,v as M,w as re,z as ie}from"./vendor-mui-Bww7KKTa.js";import{$t as ae,H as N,Jt as P,M as F,Zn as I,Zt as L,bn as oe,kn as se,m as ce,pn as R,rn as z,t as B}from"./vendor-icons-DDNOEImp.js";import{n as V,t as H}from"./colors-BKj5sies.js";import{i as U,n as W}from"./index-CIScRkE1.js";import"./AIMetricChip-BBnEI9Xy.js";import"./EvidenceBadge-BfkVrqT0.js";var G=e(n(),1),K=t();function q(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function J(e){let t={covered:{bg:`${d.success}20`,fg:d.success,label:`Covered`},partial:{bg:`${g.main}20`,fg:g.main,label:`Partial`},gap:{bg:`${d.danger}20`,fg:d.danger,label:`Gap`}}[e]||{bg:p.secondary+`20`,fg:p.secondary,label:e};return`<span style="display:inline-block;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:700;background:${t.bg};color:${t.fg};border:1px solid ${t.fg}40">${q(t.label)}</span>`}function le(e){let t=e.generatedAt||new Date().toISOString(),n=V(e.score),r=e.articles.map(e=>`
    <tr>
      <td style="font-family:monospace;font-weight:700">${q(e.article)}</td>
      <td>${q(e.title)}${e.notes?`<br><span style="font-size:10px;color:${p.secondary}">${q(e.notes)}</span>`:``}</td>
      <td>${J(e.status)}</td>
      <td style="text-align:right;font-family:monospace">${e.evidence_count}</td>
      <td>${(e.evidence_refs||[]).map(e=>`<code style="font-size:9px;padding:1px 4px;background:${_.muted};color:${_.main};border-radius:3px;margin-right:3px">${q(e)}</code>`).join(``)}</td>
    </tr>
  `).join(``),i=e.soc2Criteria.map(e=>`
    <tr>
      <td style="font-family:monospace;font-weight:700">${q(e.criterion_id)}</td>
      <td>${q(e.name)}${e.notes?`<br><span style="font-size:10px;color:${p.secondary}">${q(e.notes)}</span>`:``}</td>
      <td>${J(e.status)}</td>
      <td style="text-align:right;font-family:monospace">${e.evidence_count}</td>
      <td>${(e.evidence_refs||[]).map(e=>`<code style="font-size:9px;padding:1px 4px;background:${_.muted};color:${_.main};border-radius:3px;margin-right:3px">${q(e)}</code>`).join(``)}</td>
    </tr>
  `).join(``),a=e.tasks.map(e=>{let t=e.completeness??Math.min(100,e.turn_count*10),n=t>=80?d.success:t>=40?g.main:d.danger;return`
    <tr>
      <td style="font-family:monospace;font-weight:700;color:${_.main}">${q(e.task_key)}</td>
      <td style="text-align:right;font-family:monospace">${e.turn_count}</td>
      <td>
        <div style="display:flex;align-items:center;gap:8px">
          <div style="flex:1;height:6px;background:${h.default};border-radius:3px;overflow:hidden">
            <div style="height:100%;width:${t}%;background:${n};border-radius:3px"></div>
          </div>
          <span style="font-size:10px;color:${p.secondary};min-width:35px;text-align:right">${t}%</span>
        </div>
      </td>
    </tr>
    `}).join(``),o=e.evidence.map(e=>{let t=e.ai_percentage>70?g.main:e.ai_percentage>40?p.secondary:d.success;return`
    <tr>
      <td style="font-family:monospace;font-size:11px">${q(e.file_path)}</td>
      <td style="text-align:right;font-family:monospace;color:${t}">${e.ai_percentage.toFixed(1)}%</td>
      <td style="text-align:right;font-family:monospace">${e.human_percentage.toFixed(1)}%</td>
      <td style="text-align:right;font-family:monospace;color:${p.secondary}">${e.total_lines}</td>
    </tr>
    `}).join(``),s=e.articles.filter(e=>e.status===`covered`).length,c=e.articles.filter(e=>e.status===`partial`).length,l=e.articles.filter(e=>e.status===`gap`).length,u=e.soc2Criteria.filter(e=>e.status===`covered`).length,v=e.soc2Criteria.filter(e=>e.status===`partial`).length,y=e.soc2Criteria.filter(e=>e.status===`gap`).length;return`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${q(e.title)} - Audit Report</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    background: ${m.deep}; color: ${p.primary}; line-height: 1.5;
  }
  .container { max-width: 1100px; margin: 0 auto; padding: 32px 24px; }
  h1 { font-size: 24px; font-weight: 800; margin-bottom: 4px; }
  h2 { font-size: 16px; font-weight: 700; margin-bottom: 12px; color: ${p.primary}; }
  .subtitle { font-size: 12px; color: ${p.secondary}; margin-bottom: 24px; }
  .score-header {
    display: flex; align-items: center; gap: 24px;
    padding: 20px; background: ${m.main}; border: 1px solid ${h.default};
    border-radius: 8px; margin-bottom: 24px;
  }
  .score-circle {
    width: 80px; height: 80px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 28px; font-weight: 800; flex-shrink: 0;
  }
  .kpi-row { display: flex; gap: 12px; margin-bottom: 24px; flex-wrap: wrap; }
  .kpi-card {
    flex: 1; min-width: 140px; padding: 16px; background: ${m.main};
    border: 1px solid ${h.default}; border-radius: 8px;
  }
  .kpi-label { font-size: 10px; font-weight: 600; color: ${p.secondary}; text-transform: uppercase; letter-spacing: 0.5px; }
  .kpi-value { font-size: 24px; font-weight: 800; margin-top: 2px; }
  .section {
    margin-bottom: 24px; background: ${m.main};
    border: 1px solid ${h.default}; border-radius: 8px; overflow: hidden;
  }
  .section-header {
    padding: 12px 16px; cursor: pointer; user-select: none;
    display: flex; align-items: center; gap: 8px;
    border-bottom: 1px solid ${h.default}; background: ${m.card};
  }
  .section-header:hover { background: ${m.elevated}; }
  .section-header .arrow { transition: transform 0.2s; font-size: 12px; color: ${p.muted}; }
  .section-header.collapsed .arrow { transform: rotate(-90deg); }
  .section-body { padding: 0; }
  .section-body.hidden { display: none; }
  table { width: 100%; border-collapse: collapse; font-size: 12px; }
  th { text-align: left; padding: 8px 12px; color: ${p.secondary}; font-weight: 700; font-size: 11px; border-bottom: 1px solid ${h.default}; background: ${m.main}; }
  td { padding: 6px 12px; border-bottom: 1px solid ${m.card}; color: ${p.primary}; }
  tr:hover td { background: ${m.card}; }
  .chip-row { display: flex; gap: 6px; margin-bottom: 12px; padding: 0 16px; padding-top: 12px; }
  .chip { display: inline-block; padding: 2px 10px; border-radius: 4px; font-size: 11px; font-weight: 700; }
  .footer {
    margin-top: 32px; padding-top: 16px; border-top: 1px solid ${h.default};
    font-size: 10px; color: ${p.muted}; text-align: center;
  }
  @media print {
    body { background: ${p.primary}; color: ${p.inverse}; }
    .section-header { background: ${p.primary}; }
    td, th { border-color: ${h.default}; color: ${p.inverse}; }
    .kpi-card, .section, .score-header { border-color: ${h.default}; background: ${p.primary}; }
  }
</style>
</head>
<body>
<div class="container">
  <h1>${q(e.title)}</h1>
  <div class="subtitle">Generated ${new Date(t).toLocaleString()} | CodeWitness Audit Platform</div>

  <div class="score-header">
    <div class="score-circle" style="background:${n}18;border:3px solid ${n};color:${n}">
      ${e.score}%
    </div>
    <div>
      <div style="font-size:13px;font-weight:700;color:${p.primary}">Overall Compliance Score</div>
      <div style="font-size:11px;color:${p.secondary};margin-top:4px">
        Chain: ${e.chainValid?'<span style="color:${status.success}">VALID</span>':'<span style="color:${status.danger}">BROKEN</span>'}
        (${e.chainEventCount} events) |
        PRISM: ${e.prismAcceptedCount}/${e.prismSessionCount} accepted |
        FRAME violations: ${e.frameViolationCount}
      </div>
    </div>
  </div>

  <div class="kpi-row">
    <div class="kpi-card">
      <div class="kpi-label">Compliance Score</div>
      <div class="kpi-value" style="color:${n}">${e.score}%</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">Evidence Items</div>
      <div class="kpi-value" style="color:${_.main}">${e.articles.reduce((e,t)=>e+t.evidence_count,0)+e.soc2Criteria.reduce((e,t)=>e+t.evidence_count,0)}</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">Tasks Tracked</div>
      <div class="kpi-value" style="color:${f.beam}">${e.tasks.length}</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">PRISM Accepted</div>
      <div class="kpi-value" style="color:${d.success}">${e.prismAcceptedCount}</div>
    </div>
  </div>

  <!-- EU AI Act -->
  <div class="section">
    <div class="section-header" onclick="toggleSection(this)">
      <span class="arrow">&#9660;</span>
      <h2 style="margin:0">EU AI Act Compliance</h2>
    </div>
    <div class="section-body">
      <div class="chip-row">
        <span class="chip" style="background:${d.success}20;color:${d.success}">${s} Covered</span>
        <span class="chip" style="background:${g.main}20;color:${g.main}">${c} Partial</span>
        <span class="chip" style="background:${d.danger}20;color:${d.danger}">${l} Gaps</span>
      </div>
      <table>
        <thead><tr><th>Article</th><th>Title</th><th>Status</th><th style="text-align:right">Evidence</th><th>References</th></tr></thead>
        <tbody>${r||'<tr><td colspan="5" style="text-align:center;color:${text.secondary};padding:24px">No article data</td></tr>'}</tbody>
      </table>
    </div>
  </div>

  <!-- SOC 2 -->
  <div class="section">
    <div class="section-header" onclick="toggleSection(this)">
      <span class="arrow">&#9660;</span>
      <h2 style="margin:0">SOC 2 Trust Service Criteria</h2>
    </div>
    <div class="section-body">
      <div class="chip-row">
        <span class="chip" style="background:${d.success}20;color:${d.success}">${u} Covered</span>
        <span class="chip" style="background:${g.main}20;color:${g.main}">${v} Partial</span>
        <span class="chip" style="background:${d.danger}20;color:${d.danger}">${y} Gaps</span>
      </div>
      <table>
        <thead><tr><th>Criterion</th><th>Name</th><th>Status</th><th style="text-align:right">Evidence</th><th>References</th></tr></thead>
        <tbody>${i||'<tr><td colspan="5" style="text-align:center;color:${text.secondary};padding:24px">No criteria data</td></tr>'}</tbody>
      </table>
    </div>
  </div>

  <!-- Traceability -->
  <div class="section">
    <div class="section-header" onclick="toggleSection(this)">
      <span class="arrow">&#9660;</span>
      <h2 style="margin:0">Task Traceability (${e.tasks.length} tasks)</h2>
    </div>
    <div class="section-body">
      <table>
        <thead><tr><th>Task</th><th style="text-align:right">Turns</th><th>Completeness</th></tr></thead>
        <tbody>${a||'<tr><td colspan="3" style="text-align:center;color:${text.secondary};padding:24px">No task data</td></tr>'}</tbody>
      </table>
    </div>
  </div>

  <!-- Evidence -->
  ${e.evidence.length>0?`
  <div class="section">
    <div class="section-header" onclick="toggleSection(this)">
      <span class="arrow">&#9660;</span>
      <h2 style="margin:0">File Evidence &amp; Attribution (${e.evidence.length} files)</h2>
    </div>
    <div class="section-body">
      <table>
        <thead><tr><th>File</th><th style="text-align:right">AI %</th><th style="text-align:right">Human %</th><th style="text-align:right">Lines</th></tr></thead>
        <tbody>${o}</tbody>
      </table>
    </div>
  </div>
  `:``}

  <div class="footer">
    This report was generated by CodeWitness Audit | ${new Date(t).toISOString()}
  </div>
</div>
<script>
function toggleSection(header) {
  header.classList.toggle('collapsed');
  var body = header.nextElementSibling;
  body.classList.toggle('hidden');
}
<\/script>
</body>
</html>`}function ue(e,t){let n=new Blob([e],{type:`text/html;charset=utf-8`}),r=URL.createObjectURL(n),i=document.createElement(`a`);i.href=r,i.download=t,document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(r)}function de({getData:e,label:t=`Export Audit Report`}){let[n,r]=(0,G.useState)(!1);return(0,K.jsx)(D,{variant:`contained`,size:`small`,startIcon:n?(0,K.jsx)(T,{size:12,sx:{color:p.primary}}):(0,K.jsx)(z,{size:14}),onClick:async()=>{r(!0);try{ue(le(await e()),`audit-report-${new Date().toISOString().slice(0,10)}.html`)}catch(e){console.error(`Audit HTML export failed:`,e)}finally{r(!1)}},disabled:n,sx:{bgcolor:g.main,color:p.primary,fontWeight:500,fontSize:12,"&:hover":{bgcolor:g.main},"&:disabled":{bgcolor:`${g.main}60`}},children:t})}function fe(e){switch(e){case`verified`:case`covered`:return`ok`;case`partial`:return`warn`;case`gap`:return`error`;default:return`neutral`}}function pe(e){return{verified:`Verified`,covered:`Covered`,partial:`Partial`,gap:`Gap`}[e]||e}function Y(e){return(0,K.jsx)(U,{label:pe(e),variant:fe(e)})}function X({label:e,value:t,suffix:n,color:r,icon:i}){return(0,K.jsxs)(W,{hoverLift:!0,sx:{flex:1,minWidth:160,p:2,display:`flex`,alignItems:`center`,gap:2},children:[(0,K.jsx)(O,{sx:{width:44,height:44,borderRadius:`50%`,bgcolor:`${r}18`,border:`2px solid ${r}`,display:`flex`,alignItems:`center`,justifyContent:`center`},children:i}),(0,K.jsxs)(O,{children:[(0,K.jsx)(A,{sx:{fontSize:10,color:H.textMuted,fontWeight:500,textTransform:`uppercase`,letterSpacing:.5},children:e}),(0,K.jsxs)(A,{sx:{fontSize:24,fontWeight:500,color:r,lineHeight:1.1},children:[t,n]})]})]})}function me({sessions:e,violations:t,chainData:n,taskKeys:r}){let i=v(),a=n?.valid===!0,o=n?.event_count||0,s=e.filter(e=>e.current_phase===`accept`||e.current_phase===`export`),c=e.filter(e=>e.current_phase!==`accept`&&e.current_phase!==`export`),l=t.filter(e=>e.severity===`red`||e.severity===`high`),u=t.filter(e=>e.severity===`yellow`||e.severity===`medium`);return(0,K.jsxs)(O,{sx:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(340px, 1fr))`,gap:2},children:[(0,K.jsxs)(W,{hoverLift:!0,sx:{p:2.5},children:[(0,K.jsxs)(O,{sx:{display:`flex`,alignItems:`center`,gap:1,mb:2},children:[(0,K.jsx)(F,{size:20,style:{color:a?H.green:H.red}}),(0,K.jsx)(A,{sx:{fontWeight:500,fontSize:15,color:H.text},children:`Chain Integrity`})]}),(0,K.jsx)(U,{label:a?`VALID`:`BROKEN`,variant:a?`ok`:`error`}),(0,K.jsxs)(A,{variant:`body2`,sx:{mt:1,fontSize:12,color:H.textMuted},children:[o,` events in chain`]})]}),(0,K.jsxs)(W,{hoverLift:!0,sx:{p:2.5},children:[(0,K.jsxs)(O,{sx:{display:`flex`,alignItems:`center`,gap:1,mb:2},children:[(0,K.jsx)(I,{size:20,style:{color:H.purple}}),(0,K.jsx)(A,{sx:{fontWeight:500,fontSize:15,color:H.text},children:`PRISM Sessions`})]}),(0,K.jsxs)(y,{direction:`row`,spacing:1,sx:{mb:1},children:[(0,K.jsx)(j,{label:`${e.length} Total`,size:`small`,sx:{bgcolor:`${H.purple}18`,color:H.purple}}),(0,K.jsx)(U,{label:`${s.length} Completed`,variant:`ok`}),(0,K.jsx)(U,{label:`${c.length} Active`,variant:`info`})]}),e.length>0&&(0,K.jsxs)(O,{sx:{mt:1},children:[(0,K.jsx)(ie,{variant:`determinate`,value:e.length>0?s.length/e.length*100:0,sx:{height:6,borderRadius:3,bgcolor:h.default,"& .MuiLinearProgress-bar":{bgcolor:H.green,borderRadius:3}}}),(0,K.jsxs)(A,{sx:{fontSize:10,color:H.textDim,mt:.5},children:[Math.round(s.length/e.length*100),`% acceptance rate`]})]})]}),(0,K.jsxs)(W,{hoverLift:!0,sx:{p:2.5},children:[(0,K.jsxs)(O,{sx:{display:`flex`,alignItems:`center`,gap:1,mb:2},children:[(0,K.jsx)(B,{size:20,style:{color:H.orange}}),(0,K.jsx)(A,{sx:{fontWeight:500,fontSize:15,color:H.text},children:`BEAM Runs`})]}),(0,K.jsx)(A,{sx:{fontSize:12,color:H.textMuted},children:`Automated workflow orchestration sessions tracked via PRISM.`}),(0,K.jsx)(D,{size:`small`,variant:`outlined`,onClick:()=>i(`/prism/beam`),sx:{mt:1,fontSize:11},children:`View BEAM`})]}),(0,K.jsxs)(W,{hoverLift:!0,sx:{p:2.5},children:[(0,K.jsxs)(O,{sx:{display:`flex`,alignItems:`center`,gap:1,mb:2},children:[(0,K.jsx)(ce,{size:20,style:{color:l.length>0?H.red:H.green}}),(0,K.jsx)(A,{sx:{fontWeight:500,fontSize:15,color:H.text},children:`FRAME Violations`})]}),(0,K.jsxs)(y,{direction:`row`,spacing:1,children:[(0,K.jsx)(U,{label:`${l.length} Critical`,variant:`error`}),(0,K.jsx)(U,{label:`${u.length} Warning`,variant:`warn`})]}),(0,K.jsx)(D,{size:`small`,variant:`outlined`,onClick:()=>i(`/frame`),sx:{mt:1,fontSize:11},children:`View FRAME Rules`})]}),(0,K.jsxs)(W,{hoverLift:!0,sx:{p:2.5,gridColumn:`span 2`},children:[(0,K.jsxs)(O,{sx:{display:`flex`,alignItems:`center`,gap:1,mb:2},children:[(0,K.jsx)(P,{size:20,style:{color:H.blue}}),(0,K.jsxs)(A,{sx:{fontWeight:500,fontSize:15,color:H.text},children:[`Task Coverage (`,r.length,` tasks)`]})]}),(0,K.jsx)(O,{sx:{maxHeight:200,overflow:`auto`},children:r.slice(0,20).map(e=>(0,K.jsxs)(O,{sx:{display:`flex`,alignItems:`center`,gap:1,py:.3,cursor:`pointer`,"&:hover":{bgcolor:m.elevated}},onClick:()=>i(`/lens/tasks/${e.task_key}`),children:[(0,K.jsx)(A,{sx:{fontFamily:`monospace`,color:H.blue,fontSize:11,width:80},children:e.task_key}),(0,K.jsx)(O,{sx:{flex:1,height:4,borderRadius:2,bgcolor:h.default,overflow:`hidden`},children:(0,K.jsx)(O,{sx:{height:`100%`,borderRadius:2,width:`${Math.min(100,e.turn_count*10)}%`,bgcolor:e.turn_count>5?H.green:e.turn_count>0?H.yellow:H.red}})}),(0,K.jsx)(A,{sx:{fontSize:10,color:H.textDim,width:30,textAlign:`right`},children:e.turn_count})]},e.task_key))})]})]})}function he(){let{data:e,isLoading:t,error:n}=r({queryKey:[`report-euaiact`],queryFn:()=>a()});if(t)return(0,K.jsx)(Z,{label:`Loading EU AI Act report...`});if(n)return(0,K.jsx)(Q,{message:`Failed to load EU AI Act report`});if(!e)return(0,K.jsx)($,{message:`No EU AI Act report data available`});let i=e.articles||[],o=e.capability_score??e.compliance_score??0,s=e.evidence_quality_score??0,c=e.audit_readiness??`unknown`,l=e.risks||[],u=i.filter(e=>e.status===`verified`).length,d=i.filter(e=>e.status===`partial`).length,f=i.filter(e=>e.status===`gap`).length;return(0,K.jsxs)(O,{children:[(0,K.jsxs)(O,{sx:{display:`flex`,gap:2,mb:2},children:[(0,K.jsxs)(S,{sx:{flex:1,p:2,bgcolor:H.surface,border:`1px solid ${H.border}`,display:`flex`,alignItems:`center`,gap:2},children:[(0,K.jsx)(O,{sx:{width:44,height:44,borderRadius:`50%`,bgcolor:`${V(o)}18`,border:`2px solid ${V(o)}`,display:`flex`,alignItems:`center`,justifyContent:`center`},children:(0,K.jsx)(N,{size:20,style:{color:V(o)}})}),(0,K.jsxs)(O,{children:[(0,K.jsx)(A,{sx:{fontSize:11,color:H.textMuted,fontWeight:500},children:`Capability`}),(0,K.jsxs)(A,{sx:{fontSize:22,fontWeight:500,color:V(o)},children:[o.toFixed(1),`%`]})]})]}),(0,K.jsxs)(S,{sx:{flex:1,p:2,bgcolor:H.surface,border:`1px solid ${H.border}`,display:`flex`,alignItems:`center`,gap:2},children:[(0,K.jsx)(O,{sx:{width:44,height:44,borderRadius:`50%`,bgcolor:`${V(s)}18`,border:`2px solid ${V(s)}`,display:`flex`,alignItems:`center`,justifyContent:`center`},children:(0,K.jsx)(F,{size:20,style:{color:V(s)}})}),(0,K.jsxs)(O,{children:[(0,K.jsx)(A,{sx:{fontSize:11,color:H.textMuted,fontWeight:500},children:`Evidence Quality`}),(0,K.jsxs)(A,{sx:{fontSize:22,fontWeight:500,color:V(s)},children:[s.toFixed(1),`%`]})]})]}),(0,K.jsx)(S,{sx:{p:2,bgcolor:H.surface,border:`1px solid ${H.border}`,display:`flex`,alignItems:`center`},children:(0,K.jsx)(U,{label:c.toUpperCase(),variant:c===`ready`?`ok`:c===`partial`?`warn`:`error`})})]}),l.length>0&&(0,K.jsxs)(S,{sx:{p:1.5,mb:2,bgcolor:H.redBg,border:`1px solid ${H.red}30`},children:[(0,K.jsxs)(A,{sx:{fontSize:11,fontWeight:500,color:H.red,mb:.5},children:[`Risks (`,l.length,`)`]}),l.map((e,t)=>(0,K.jsxs)(A,{sx:{fontSize:11,color:H.red,ml:1},children:[`• `,e]},t))]}),e.summary&&(0,K.jsx)(S,{sx:{p:1.5,mb:2,bgcolor:H.surface,border:`1px solid ${H.border}`},children:(0,K.jsx)(A,{sx:{fontSize:11,color:H.textMuted},children:e.summary})}),(0,K.jsxs)(O,{sx:{display:`flex`,gap:1,mb:2},children:[(0,K.jsx)(U,{label:`${u} Verified`,variant:`ok`}),(0,K.jsx)(U,{label:`${d} Partial`,variant:`warn`}),(0,K.jsx)(U,{label:`${f} Gaps`,variant:`error`})]}),(0,K.jsx)(S,{sx:{bgcolor:H.surface,border:`1px solid ${H.border}`,overflow:`hidden`},children:(0,K.jsxs)(x,{size:`small`,children:[(0,K.jsx)(k,{children:(0,K.jsxs)(C,{children:[(0,K.jsx)(E,{sx:{color:H.textMuted,fontWeight:500,fontSize:11,borderColor:H.border},children:`Article`}),(0,K.jsx)(E,{sx:{color:H.textMuted,fontWeight:500,fontSize:11,borderColor:H.border},children:`Title`}),(0,K.jsx)(E,{sx:{color:H.textMuted,fontWeight:500,fontSize:11,borderColor:H.border},children:`Status`}),(0,K.jsx)(E,{sx:{color:H.textMuted,fontWeight:500,fontSize:11,borderColor:H.border},align:`right`,children:`Evidence`}),(0,K.jsx)(E,{sx:{color:H.textMuted,fontWeight:500,fontSize:11,borderColor:H.border},children:`References`})]})}),(0,K.jsx)(w,{children:i.map((e,t)=>(0,K.jsxs)(C,{sx:{"&:hover":{bgcolor:H.surfaceHover}},children:[(0,K.jsxs)(E,{sx:{color:H.text,fontWeight:500,fontSize:12,fontFamily:`monospace`,borderColor:H.border},children:[`Art. `,e.article_num]}),(0,K.jsxs)(E,{sx:{color:H.text,fontSize:12,borderColor:H.border},children:[e.title,e.note&&(0,K.jsx)(A,{sx:{fontSize:10,color:H.textDim,mt:.3},children:e.note})]}),(0,K.jsx)(E,{sx:{borderColor:H.border},children:Y(e.status)}),(0,K.jsx)(E,{align:`right`,sx:{color:H.text,fontWeight:500,fontSize:12,fontFamily:`monospace`,borderColor:H.border},children:e.evidence_count}),(0,K.jsx)(E,{sx:{borderColor:H.border},children:(0,K.jsxs)(O,{sx:{display:`flex`,flexWrap:`wrap`,gap:.5},children:[(e.evidence_links||[]).slice(0,3).map((e,t)=>(0,K.jsx)(j,{label:e,size:`small`,sx:{height:18,fontSize:9,fontFamily:`monospace`,bgcolor:H.blueBg,color:H.blue}},t)),(e.evidence_links||[]).length>3&&(0,K.jsx)(j,{label:`+${e.evidence_links.length-3}`,size:`small`,sx:{height:18,fontSize:9,bgcolor:H.surfaceHover,color:H.textMuted}})]})})]},`art-${e.article_num}-${t}`))})]})}),e.metadata?.generated_at&&(0,K.jsxs)(A,{sx:{fontSize:10,color:H.textFaint,mt:1,display:`flex`,alignItems:`center`,gap:.5},children:[(0,K.jsx)(R,{size:10}),` Generated `,new Date(e.metadata.generated_at).toLocaleString()]})]})}function ge(){let{data:e,isLoading:t,error:n}=r({queryKey:[`report-soc2`],queryFn:()=>i()});if(t)return(0,K.jsx)(Z,{label:`Loading SOC 2 report...`});if(n)return(0,K.jsx)(Q,{message:`Failed to load SOC 2 report`});if(!e)return(0,K.jsx)($,{message:`No SOC 2 report data available`});let a=e.trust_criteria||[],o=e.control_score??0,s=a.filter(e=>e.status===`verified`).length,c=a.filter(e=>e.status===`partial`).length,l=a.filter(e=>e.status===`gap`).length;return(0,K.jsxs)(O,{children:[(0,K.jsxs)(O,{sx:{display:`flex`,gap:2,mb:2},children:[(0,K.jsxs)(S,{sx:{flex:1,p:2,bgcolor:H.surface,border:`1px solid ${H.border}`,display:`flex`,alignItems:`center`,gap:2},children:[(0,K.jsx)(O,{sx:{width:44,height:44,borderRadius:`50%`,bgcolor:`${V(o)}18`,border:`2px solid ${V(o)}`,display:`flex`,alignItems:`center`,justifyContent:`center`},children:(0,K.jsx)(F,{size:20,style:{color:V(o)}})}),(0,K.jsxs)(O,{children:[(0,K.jsx)(A,{sx:{fontSize:11,color:H.textMuted,fontWeight:500},children:`SOC 2 Score`}),(0,K.jsxs)(A,{sx:{fontSize:22,fontWeight:500,color:V(o)},children:[o.toFixed(1),`%`]})]})]}),e.summary&&(0,K.jsx)(S,{sx:{flex:2,p:2,bgcolor:H.surface,border:`1px solid ${H.border}`},children:(0,K.jsx)(A,{sx:{fontSize:11,color:H.textMuted},children:e.summary})})]}),(0,K.jsxs)(O,{sx:{display:`flex`,gap:1,mb:2},children:[(0,K.jsx)(U,{label:`${s} Verified`,variant:`ok`}),(0,K.jsx)(U,{label:`${c} Partial`,variant:`warn`}),(0,K.jsx)(U,{label:`${l} Gaps`,variant:`error`})]}),(0,K.jsx)(S,{sx:{bgcolor:H.surface,border:`1px solid ${H.border}`,overflow:`hidden`},children:(0,K.jsxs)(x,{size:`small`,children:[(0,K.jsx)(k,{children:(0,K.jsxs)(C,{children:[(0,K.jsx)(E,{sx:{color:H.textMuted,fontWeight:500,fontSize:11,borderColor:H.border},children:`Criterion`}),(0,K.jsx)(E,{sx:{color:H.textMuted,fontWeight:500,fontSize:11,borderColor:H.border},children:`Title`}),(0,K.jsx)(E,{sx:{color:H.textMuted,fontWeight:500,fontSize:11,borderColor:H.border},children:`Status`}),(0,K.jsx)(E,{sx:{color:H.textMuted,fontWeight:500,fontSize:11,borderColor:H.border},align:`right`,children:`Evidence`}),(0,K.jsx)(E,{sx:{color:H.textMuted,fontWeight:500,fontSize:11,borderColor:H.border},children:`References`})]})}),(0,K.jsx)(w,{children:a.map((e,t)=>(0,K.jsxs)(C,{sx:{"&:hover":{bgcolor:H.surfaceHover}},children:[(0,K.jsx)(E,{sx:{color:H.text,fontWeight:500,fontSize:12,fontFamily:`monospace`,borderColor:H.border},children:e.criterion_id}),(0,K.jsxs)(E,{sx:{color:H.text,fontSize:12,borderColor:H.border},children:[e.title,e.note&&(0,K.jsx)(A,{sx:{fontSize:10,color:H.textDim,mt:.3},children:e.note})]}),(0,K.jsx)(E,{sx:{borderColor:H.border},children:Y(e.status)}),(0,K.jsx)(E,{align:`right`,sx:{color:H.text,fontWeight:500,fontSize:12,fontFamily:`monospace`,borderColor:H.border},children:e.evidence_count}),(0,K.jsx)(E,{sx:{borderColor:H.border},children:(0,K.jsxs)(O,{sx:{display:`flex`,flexWrap:`wrap`,gap:.5},children:[(e.evidence_links||[]).slice(0,3).map((e,t)=>(0,K.jsx)(j,{label:e,size:`small`,sx:{height:18,fontSize:9,fontFamily:`monospace`,bgcolor:H.blueBg,color:H.blue}},t)),(e.evidence_links||[]).length>3&&(0,K.jsx)(j,{label:`+${e.evidence_links.length-3}`,size:`small`,sx:{height:18,fontSize:9,bgcolor:H.surfaceHover,color:H.textMuted}})]})})]},e.criterion_id||t))})]})}),e.metadata?.generated_at&&(0,K.jsxs)(A,{sx:{fontSize:10,color:H.textFaint,mt:1,display:`flex`,alignItems:`center`,gap:.5},children:[(0,K.jsx)(R,{size:10}),` Generated `,new Date(e.metadata.generated_at).toLocaleString()]})]})}function _e({taskKeys:e}){let t=v(),[n,i]=(0,G.useState)(``),[a,o]=(0,G.useState)(`table`),{data:c,isLoading:l}=r({queryKey:[`project-compliance-PL`],queryFn:()=>s.get(`/api/v1/report/project-compliance/PL`).then(e=>e.data)}),u=c?.tasks||[],d=c?.overall_score||0,f=c?.complete_chains||0,p=(0,G.useMemo)(()=>{if(!n)return u;let e=n.toLowerCase();return u.filter(t=>t.task_key.toLowerCase().includes(e))},[u,n]);return l?(0,K.jsx)(Z,{label:`Loading traceability...`}):(0,K.jsxs)(O,{children:[(0,K.jsxs)(O,{sx:{display:`flex`,gap:2,mb:2},children:[(0,K.jsxs)(S,{sx:{p:2,bgcolor:H.surface,border:`1px solid ${H.border}`,display:`flex`,alignItems:`center`,gap:2},children:[(0,K.jsx)(O,{sx:{width:44,height:44,borderRadius:`50%`,bgcolor:`${V(d)}18`,border:`2px solid ${V(d)}`,display:`flex`,alignItems:`center`,justifyContent:`center`},children:(0,K.jsx)(I,{size:20,style:{color:V(d)}})}),(0,K.jsxs)(O,{children:[(0,K.jsx)(A,{sx:{fontSize:11,color:H.textMuted,fontWeight:500},children:`Project Traceability`}),(0,K.jsxs)(A,{sx:{fontSize:22,fontWeight:500,color:V(d)},children:[d,`%`]})]})]}),(0,K.jsx)(S,{sx:{flex:1,p:2,bgcolor:H.surface,border:`1px solid ${H.border}`},children:(0,K.jsxs)(A,{sx:{fontSize:11,color:H.textMuted},children:[f,`/`,u.length,` tasks with complete evidence chain (prompt + code + test + review + acceptance + decision + thinking)`]})})]}),(0,K.jsxs)(O,{sx:{display:`flex`,alignItems:`center`,gap:2,mb:2},children:[(0,K.jsxs)(A,{sx:{fontSize:13,fontWeight:500,color:H.text},children:[p.length,` tasks`]}),(0,K.jsx)(O,{sx:{flex:1}}),(0,K.jsx)(ee,{size:`small`,placeholder:`Search tasks...`,value:n,onChange:e=>i(e.target.value),InputProps:{startAdornment:(0,K.jsx)(b,{position:`start`,children:(0,K.jsx)(P,{size:14,style:{color:H.textFaint}})})},sx:{width:240,"& .MuiOutlinedInput-root":{fontSize:12,bgcolor:H.surface,color:H.text,"& fieldset":{borderColor:H.border}}}})]}),(0,K.jsx)(S,{sx:{bgcolor:H.surface,border:`1px solid ${H.border}`,overflow:`hidden`},children:(0,K.jsxs)(x,{size:`small`,children:[(0,K.jsx)(k,{children:(0,K.jsxs)(C,{children:[(0,K.jsx)(E,{sx:{color:H.textMuted,fontWeight:500,fontSize:11,borderColor:H.border},children:`Task`}),(0,K.jsx)(E,{sx:{color:H.textMuted,fontWeight:500,fontSize:11,borderColor:H.border},children:`Evidence Chain`}),(0,K.jsx)(E,{sx:{color:H.textMuted,fontWeight:500,fontSize:11,borderColor:H.border},children:`Score`}),(0,K.jsx)(E,{sx:{color:H.textMuted,fontWeight:500,fontSize:11,borderColor:H.border},children:`Missing`})]})}),(0,K.jsx)(w,{children:p.map(e=>{let n=e.chain_score||0,r=n>=80?H.green:n>=40?H.yellow:H.red,i=[{key:`P`,has:e.has_prompt,label:`Prompt`},{key:`C`,has:e.has_code,label:`Code`},{key:`T`,has:e.has_test,label:`Test`},{key:`R`,has:e.has_review,label:`Review`},{key:`A`,has:e.has_acceptance,label:`Accept`},{key:`D`,has:e.has_decision,label:`Decision`},{key:`Th`,has:e.has_thinking,label:`Thinking`}];return(0,K.jsxs)(C,{sx:{cursor:`pointer`,"&:hover":{bgcolor:H.surfaceHover}},onClick:()=>t(`/lens/tasks/${e.task_key}`),children:[(0,K.jsx)(E,{sx:{color:H.blue,fontWeight:500,fontSize:12,fontFamily:`monospace`,borderColor:H.border},children:e.task_key}),(0,K.jsx)(E,{sx:{borderColor:H.border},children:(0,K.jsx)(O,{sx:{display:`flex`,gap:.3},children:i.map(e=>(0,K.jsx)(re,{title:e.label,children:(0,K.jsx)(O,{sx:{width:20,height:20,borderRadius:.5,fontSize:9,fontWeight:500,display:`flex`,alignItems:`center`,justifyContent:`center`,bgcolor:e.has?`${H.green}20`:`${H.red}15`,color:e.has?H.green:H.red,border:`1px solid ${e.has?H.green:H.red}30`},children:e.key})},e.key))})}),(0,K.jsx)(E,{sx:{borderColor:H.border},children:(0,K.jsxs)(O,{sx:{display:`flex`,alignItems:`center`,gap:1},children:[(0,K.jsx)(O,{sx:{flex:1,height:6,borderRadius:3,bgcolor:h.default,overflow:`hidden`,maxWidth:80},children:(0,K.jsx)(O,{sx:{height:`100%`,width:`${n}%`,bgcolor:r,borderRadius:3}})}),(0,K.jsxs)(A,{sx:{fontSize:10,color:r,fontWeight:500,minWidth:30},children:[n,`%`]})]})}),(0,K.jsx)(E,{sx:{borderColor:H.border},children:(0,K.jsx)(A,{sx:{fontSize:10,color:H.textDim},children:e.missing_links?.length?e.missing_links.join(`, `):`—`})})]},e.task_key)})})]})}),p.length===0&&(0,K.jsx)(O,{sx:{textAlign:`center`,py:6},children:(0,K.jsx)(A,{sx:{color:H.textDim,fontSize:13},children:n?`No tasks match.`:`No tasks found.`})})]})}function ve(){let e=v(),{data:t,isLoading:n}=r({queryKey:[`files-list`],queryFn:o});if(n)return(0,K.jsx)(Z,{label:`Loading files...`});let i=t?.files||[];return(0,K.jsxs)(O,{children:[(0,K.jsxs)(A,{sx:{fontSize:13,fontWeight:500,color:H.text,mb:2},children:[i.length,` tracked files with AI attribution`]}),(0,K.jsx)(S,{sx:{bgcolor:H.surface,border:`1px solid ${H.border}`,overflow:`hidden`},children:(0,K.jsxs)(x,{size:`small`,children:[(0,K.jsx)(k,{children:(0,K.jsxs)(C,{children:[(0,K.jsx)(E,{sx:{color:H.textMuted,fontWeight:500,fontSize:11,borderColor:H.border},children:`File`}),(0,K.jsx)(E,{sx:{color:H.textMuted,fontWeight:500,fontSize:11,borderColor:H.border},align:`right`,children:`AI %`}),(0,K.jsx)(E,{sx:{color:H.textMuted,fontWeight:500,fontSize:11,borderColor:H.border}})]})}),(0,K.jsx)(w,{children:i.slice(0,50).map((t,n)=>{let r=t.ai_pct??0,i=r>70?H.yellow:r>40?H.textMuted:H.green;return(0,K.jsxs)(C,{sx:{cursor:`pointer`,"&:hover":{bgcolor:H.surfaceHover}},onClick:()=>e(`/lens/files/${t.path}`),children:[(0,K.jsx)(E,{sx:{color:H.text,fontSize:11,fontFamily:`monospace`,borderColor:H.border},children:(0,K.jsxs)(O,{sx:{display:`flex`,alignItems:`center`,gap:1},children:[(0,K.jsx)(L,{size:12,style:{color:H.blue,flexShrink:0}}),t.path]})}),(0,K.jsx)(E,{align:`right`,sx:{fontFamily:`monospace`,fontSize:12,color:i,fontWeight:500,borderColor:H.border},children:r>0?`${r.toFixed(0)}%`:`--`}),(0,K.jsx)(E,{sx:{borderColor:H.border,width:80},children:r>0&&(0,K.jsxs)(O,{sx:{display:`flex`,height:6,borderRadius:3,overflow:`hidden`,bgcolor:h.default},children:[(0,K.jsx)(O,{sx:{width:`${r}%`,bgcolor:H.green,height:`100%`}}),(0,K.jsx)(O,{sx:{width:`${100-r}%`,bgcolor:H.blue,height:`100%`}})]})})]},`${t.path}-${n}`)})})]})})]})}function Z({label:e}){return(0,K.jsxs)(O,{sx:{display:`flex`,alignItems:`center`,gap:2,p:6,justifyContent:`center`},children:[(0,K.jsx)(T,{size:20,sx:{color:H.blue}}),(0,K.jsx)(A,{sx:{fontSize:13,color:H.textMuted},children:e})]})}function Q({message:e}){return(0,K.jsx)(te,{severity:`error`,sx:{m:2,bgcolor:H.redBg,color:H.text,border:`1px solid ${H.red}40`},children:e})}function $({message:e}){return(0,K.jsx)(O,{sx:{p:6,textAlign:`center`},children:(0,K.jsx)(A,{sx:{fontSize:13,color:H.textDim},children:e})})}function ye(){let[e,t]=(0,G.useState)(0),{data:n}=r({queryKey:[`report-euaiact`],queryFn:()=>a()}),{data:d}=r({queryKey:[`dashboard-completeness`],queryFn:()=>s.get(`/api/v1/dashboard/completeness`).then(e=>e.data),retry:!1}),{data:f}=r({queryKey:[`chain-verify`],queryFn:()=>s.get(`/api/v1/frame/verify-chain`).then(e=>e.data),retry:!1}),{data:p}=r({queryKey:[`prism-sessions`],queryFn:u}),{data:m}=r({queryKey:[`frame-violations`],queryFn:l}),{data:h}=r({queryKey:[`task-keys`],queryFn:c}),{data:g}=r({queryKey:[`report-soc2`],queryFn:()=>i()}),{data:_}=r({queryKey:[`files-list-export`],queryFn:o}),v=p||[],y=Array.isArray(m?.violations)?m.violations:Array.isArray(m)?m:[],b=Array.isArray(h?.tasks)?h.tasks:Array.isArray(h)?h:[],x=n?.evidence_quality_score??n?.compliance_score??0,C=d?.events?.count??0,w=d?.test_runs?.count??0,T=d?.prism_acceptances?.count??v.filter(e=>e.current_phase===`accept`||e.current_phase===`export`).length,E=(0,G.useCallback)(async()=>({title:`CodeWitness Audit Report`,score:x,generatedAt:new Date().toISOString(),articles:n?.articles||[],soc2Criteria:g?.criteria||g?.trust_criteria||[],tasks:b,evidence:(_?.files||[]).map(e=>({path:e.file_path||e.path||``,ai_pct:e.ai_pct??(e.has_ai_content?100:0),event_count:e.event_count??0,lines_added:e.lines_added??0,lines_removed:e.lines_removed??0})),chainValid:f?.valid===!0,chainEventCount:f?.event_count||0,prismSessionCount:v.length,prismAcceptedCount:T,frameViolationCount:y.length}),[x,n,g,b,f,v,T,y,_]);return(0,K.jsxs)(O,{sx:{p:3,maxWidth:1200,mx:`auto`},children:[(0,K.jsxs)(O,{sx:{display:`flex`,alignItems:`center`,gap:1.5,mb:3},children:[(0,K.jsx)(O,{sx:{width:36,height:36,borderRadius:2,bgcolor:`${H.purple}18`,border:`1px solid ${H.purple}40`,display:`flex`,alignItems:`center`,justifyContent:`center`},children:(0,K.jsx)(ae,{size:18,style:{color:H.purple}})}),(0,K.jsxs)(O,{sx:{flex:1},children:[(0,K.jsx)(A,{variant:`h5`,sx:{fontWeight:500,color:H.text,fontSize:20},children:`Auditor Dashboard`}),(0,K.jsx)(A,{sx:{fontSize:11,color:H.textMuted},children:`Compliance, traceability, and evidence in one view`})]}),(0,K.jsx)(de,{getData:E})]}),(0,K.jsxs)(O,{sx:{display:`flex`,gap:2,mb:3,flexWrap:`wrap`},children:[(0,K.jsx)(X,{label:`Compliance Score`,value:x,suffix:`%`,color:V(x),icon:(0,K.jsx)(N,{size:20,style:{color:V(x)}})}),(0,K.jsx)(X,{label:`Evidence Count`,value:C,color:H.blue,icon:(0,K.jsx)(P,{size:20,style:{color:H.blue}})}),(0,K.jsx)(X,{label:`Test Pass Rate`,value:w,color:H.green,icon:(0,K.jsx)(oe,{size:20,style:{color:H.green}})}),(0,K.jsx)(X,{label:`Acceptances`,value:T,color:H.purple,icon:(0,K.jsx)(I,{size:20,style:{color:H.purple}})})]}),(0,K.jsx)(S,{sx:{bgcolor:H.surface,border:`1px solid ${H.border}`,mb:3},children:(0,K.jsxs)(ne,{value:e,onChange:(e,n)=>t(n),sx:{minHeight:40,"& .MuiTab-root":{minHeight:40,fontSize:12,fontWeight:500,color:H.textMuted,textTransform:`none`},"& .Mui-selected":{color:`${H.purple} !important`},"& .MuiTabs-indicator":{bgcolor:H.purple}},children:[(0,K.jsx)(M,{icon:(0,K.jsx)(se,{size:14}),iconPosition:`start`,label:`Overview`}),(0,K.jsx)(M,{icon:(0,K.jsx)(N,{size:14}),iconPosition:`start`,label:`EU AI Act`}),(0,K.jsx)(M,{icon:(0,K.jsx)(F,{size:14}),iconPosition:`start`,label:`SOC 2`}),(0,K.jsx)(M,{icon:(0,K.jsx)(I,{size:14}),iconPosition:`start`,label:`Traceability`}),(0,K.jsx)(M,{icon:(0,K.jsx)(L,{size:14}),iconPosition:`start`,label:`Evidence`})]})}),e===0&&(0,K.jsx)(me,{sessions:v,violations:y,chainData:f,taskKeys:b}),e===1&&(0,K.jsx)(he,{}),e===2&&(0,K.jsx)(ge,{}),e===3&&(0,K.jsx)(_e,{taskKeys:b}),e===4&&(0,K.jsx)(ve,{})]})}export{ye as default};