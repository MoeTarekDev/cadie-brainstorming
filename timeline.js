// Timeline Data & Rendering
(function() {
  // ── Mock Data ──
  const entries = [
    // November 2023
    { id: 1, type: 'milestone', title: 'Checkout V2 shipped to production', body: 'One-click checkout flow plus undo toast shipped to 100% of returning users.', author: 'Alex D.', avatar: '#34d399', date: 'Nov 15, 2023', month: 'November 2023',
      notes: [{ author: 'Sarah K.', body: 'Confirmed: support tickets normalized after 1 week.', time: 'Nov 18' }]
    },
    { id: 2, type: 'decision', title: 'Add undo toast to one-click purchase', body: 'The 5% accidental purchase rate was unacceptable. Adding a 5-second undo window as a safety net before full rollout. This balances speed with user control.', author: 'Alex D.', avatar: 'var(--secondary)', date: 'Nov 12, 2023', month: 'November 2023',
      notes: [
        { author: 'PM Team', body: 'Legal confirmed undo window satisfies consumer protection requirements.', time: 'Nov 13' },
        { author: 'Sarah K.', body: 'Makes sense. We should revisit if mobile numbers change.', time: 'Nov 14' }
      ]
    },
    { id: 3, type: 'outcome', title: 'One-click checkout A/B results', body: 'Conversion increased 14% for returning users. However, accidental purchases caused a 5% spike in support tickets. Net positive but needs mitigation.', author: 'Alex D.', avatar: 'var(--secondary)', date: 'Nov 8, 2023', month: 'November 2023', experiment: 'One-click checkout flow', notes: [] },
    { id: 4, type: 'experiment', title: 'Guest checkout default', body: 'Testing whether defaulting to guest checkout reduces friction for first-time buyers.', author: 'Sarah K.', avatar: '#4f46e5', date: 'Nov 2, 2023', month: 'November 2023', status: 'Testing', notes: [] },

    // October 2023
    { id: 5, type: 'experiment', title: 'One-click checkout flow', body: 'Exploration of a simplified checkout bypassing the cart review step for returning users with saved payment methods.', author: 'Alex D.', avatar: 'var(--secondary)', date: 'Oct 24, 2023', month: 'October 2023', status: 'Shipped',
      notes: [{ author: 'Sarah K.', body: 'We should test with staging before going further. The multi-item edge case might be solvable.', time: 'Oct 25' }]
    },
    { id: 6, type: 'note', title: '', body: 'Hypothesis: returning users with saved payment methods don\'t need the cart review step at all. 42% drop-off at cart review supports this.', author: 'Alex D.', avatar: 'var(--secondary)', date: 'Oct 20, 2023', month: 'October 2023', notes: [] },
    { id: 7, type: 'collapsed', items: ['Artifact added to "Remove coupon field"', 'Tag updated on checkout experiments', '"Remove coupon field" linked to "One-click checkout"'], date: 'Oct 18, 2023', month: 'October 2023' },

    // September 2023
    { id: 8, type: 'experiment', title: 'Remove coupon field experiment', body: 'Testing removal of the coupon code input from checkout. Hypothesis: the field causes users to leave and search for codes, reducing conversion.', author: 'Sarah K.', avatar: '#4f46e5', date: 'Sep 15, 2023', month: 'September 2023', status: 'Rejected', notes: [] },
    { id: 9, type: 'decision', title: 'Focus Q4 on checkout conversion', body: 'After reviewing Q3 metrics, the team decided to dedicate Q4 experimentation budget to checkout conversion. Cart abandonment at 68% is the biggest lever.', author: 'Alex D.', avatar: 'var(--secondary)', date: 'Sep 10, 2023', month: 'September 2023',
      notes: [{ author: 'PM Team', body: 'Aligned with company OKRs. Budget approved for 3 parallel experiments.', time: 'Sep 11' }]
    },
    { id: 10, type: 'milestone', title: 'Checkout team formed', body: 'Cross-functional team assembled: 2 engineers, 1 designer, 1 PM. Dedicated to checkout conversion through Q4.', author: 'Alex D.', avatar: 'var(--secondary)', date: 'Sep 5, 2023', month: 'September 2023', notes: [] },
  ];

  // ── Rendering ──
  const feed = document.getElementById('tl-feed');
  let activeFilter = 'all';

  function getStatusBadge(status) {
    const cls = { Shipped: 'badge-success', Testing: 'badge-warning', Rejected: 'badge-danger' };
    return `<span class="badge ${cls[status] || ''}" style="font-size:10px; padding:2px 8px;">${status}</span>`;
  }

  function getDotColor(type) {
    return { experiment: 'blue', decision: 'purple', milestone: 'green', outcome: 'orange', note: 'gray' }[type] || 'gray';
  }

  function renderNotes(entry) {
    if (!entry.notes || entry.notes.length === 0) {
      return `<div class="tl-notes-toggle add-ctx-btn" data-id="${entry.id}">+ Add context</div>
        <div class="tl-notes-panel" id="notes-panel-${entry.id}">
          <div class="tl-add-context">
            <input type="text" class="input" placeholder="Add a context note..." data-id="${entry.id}">
            <button class="btn btn-outline" onclick="window.tlAddNote(${entry.id}, this)">Post</button>
          </div>
        </div>`;
    }
    const noteHtml = entry.notes.map(n => `
      <div class="tl-context-note">
        <span class="note-author">${n.author}</span><span class="note-time">${n.time}</span>
        <div class="note-body">${n.body}</div>
      </div>`).join('');
    return `<button class="tl-notes-toggle" data-id="${entry.id}">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        ${entry.notes.length} note${entry.notes.length > 1 ? 's' : ''} · + Add context
      </button>
      <div class="tl-notes-panel" id="notes-panel-${entry.id}">
        <div id="notes-list-${entry.id}">${noteHtml}</div>
        <div class="tl-add-context">
          <input type="text" class="input" placeholder="Add a context note..." data-id="${entry.id}">
          <button class="btn btn-outline" onclick="window.tlAddNote(${entry.id}, this)">Post</button>
        </div>
      </div>`;
  }

  function renderEntry(entry) {
    if (entry.type === 'collapsed') {
      return `<div class="tl-collapsed-group" data-type="collapsed">
        <div class="tl-dot" style="background:#3f3f46; width:9px; height:9px;"></div>
        <div class="tl-collapsed-summary" data-id="${entry.id}">▸ ${entry.items.length} minor updates · ${entry.date}</div>
        <div class="tl-collapsed-detail" id="collapsed-${entry.id}">
          ${entry.items.map(i => `<p class="text-xs text-muted" style="padding:3px 0;">· ${i}</p>`).join('')}
        </div>
      </div>`;
    }

    let inner = '';
    if (entry.type === 'experiment') {
      inner = `<div class="tl-card-type experiment">Experiment</div>
        <div class="flex items-center gap-2" style="margin-bottom:6px;">
          <span class="tl-card-title" style="margin-bottom:0;">${entry.title}</span>
          ${getStatusBadge(entry.status)}
        </div>
        <div class="tl-card-body">${entry.body}</div>`;
    } else if (entry.type === 'decision') {
      inner = `<div class="tl-card-type decision">Decision</div>
        <div class="tl-card-title">${entry.title}</div>
        <div class="tl-card-body">${entry.body}</div>`;
    } else if (entry.type === 'milestone') {
      inner = `<div class="tl-card-type milestone">Milestone</div>
        <div class="tl-card-title">${entry.title}</div>
        <div class="tl-card-body">${entry.body}</div>`;
    } else if (entry.type === 'outcome') {
      inner = `<div class="tl-card-type outcome">Outcome</div>
        <div class="tl-card-title">${entry.title}</div>
        <div class="tl-card-body">${entry.body}</div>
        ${entry.experiment ? `<div style="margin-top:8px;display:flex;align-items:center;gap:6px;">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
          <span class="text-xs" style="color:#60a5fa;">${entry.experiment}</span></div>` : ''}`;
    } else if (entry.type === 'note') {
      inner = `<div class="tl-card-type note">Note</div>
        <div class="tl-card-body">${entry.body}</div>`;
    }

    const metaHtml = entry.author ? `<div class="tl-card-meta">
      <div class="avatar" style="background:${entry.avatar};"></div>
      <span>${entry.author}</span><span>·</span><span>${entry.date}</span>
    </div>` : '';

    return `<div class="tl-entry ${entry.type}" data-type="${entry.type}">
      <div class="tl-dot ${getDotColor(entry.type)}"></div>
      <div class="tl-card" ${entry.type === 'experiment' ? "onclick=\"window.location.href='experiment.html'\"" : ''}>
        ${inner}
        ${metaHtml}
        ${entry.type !== 'collapsed' ? renderNotes(entry) : ''}
      </div>
    </div>`;
  }

  function render() {
    feed.innerHTML = '';
    let lastMonth = '';
    const filtered = entries.filter(e => activeFilter === 'all' || e.type === activeFilter);

    if (filtered.length === 0) {
      feed.innerHTML = '<p class="text-muted" style="text-align:center; padding:40px 0;">No entries match this filter.</p>';
      return;
    }

    filtered.forEach(entry => {
      if (entry.month && entry.month !== lastMonth) {
        lastMonth = entry.month;
        feed.innerHTML += `<div class="tl-date-sep">${entry.month}</div>`;
      }
      feed.innerHTML += renderEntry(entry);
    });

    // Bind interactions after render
    bindInteractions();
  }

  function bindInteractions() {
    // Context note toggles
    document.querySelectorAll('.tl-notes-toggle').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const panel = document.getElementById('notes-panel-' + id);
        if (panel) {
          panel.classList.toggle('open');
          const input = panel.querySelector('input');
          if (panel.classList.contains('open') && input) input.focus();
        }
      });
    });

    // Collapsed groups
    document.querySelectorAll('.tl-collapsed-summary').forEach(el => {
      el.addEventListener('click', () => {
        const id = el.getAttribute('data-id');
        const detail = document.getElementById('collapsed-' + id);
        if (detail) {
          detail.classList.toggle('open');
          el.textContent = detail.classList.contains('open')
            ? el.textContent.replace('▸', '▾')
            : el.textContent.replace('▾', '▸');
        }
      });
    });
  }

  // ── Add context note ──
  window.tlAddNote = function(entryId, btnEl) {
    const input = btnEl.parentElement.querySelector('input');
    const text = input.value.trim();
    if (!text) return;

    const notesList = document.getElementById('notes-list-' + entryId);
    // Create list container if it doesn't exist yet
    if (!notesList) {
      const panel = document.getElementById('notes-panel-' + entryId);
      const listDiv = document.createElement('div');
      listDiv.id = 'notes-list-' + entryId;
      panel.insertBefore(listDiv, panel.querySelector('.tl-add-context'));
    }

    const target = document.getElementById('notes-list-' + entryId);
    const noteEl = document.createElement('div');
    noteEl.className = 'tl-context-note';
    noteEl.style.opacity = '0';
    noteEl.style.transform = 'translateY(6px)';
    noteEl.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
    noteEl.innerHTML = `<span class="note-author">You</span><span class="note-time">Just now</span>
      <div class="note-body">${text.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</div>`;
    target.appendChild(noteEl);
    requestAnimationFrame(() => { noteEl.style.opacity = '1'; noteEl.style.transform = 'translateY(0)'; });

    input.value = '';

    // Update the toggle button text
    const entry = entries.find(e => e.id === entryId);
    if (entry) { entry.notes.push({ author: 'You', body: text, time: 'Just now' }); }
  };

  // ── Filter pills ──
  document.querySelectorAll('.tl-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.tl-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeFilter = pill.getAttribute('data-filter');
      render();
    });
  });

  // ── Add Entry Modal ──
  const modal = document.getElementById('entry-modal');
  const openBtn = document.getElementById('add-entry-btn');
  const openFab = document.getElementById('add-entry-fab');
  const closeBtn = document.getElementById('close-entry-modal');
  const form = document.getElementById('entry-form');
  const typeSelect = document.getElementById('entry-type');

  function openModal() { modal.classList.add('active'); document.getElementById('entry-title').focus(); }
  function closeModal() { modal.classList.remove('active'); form.reset(); }

  if (openBtn) openBtn.addEventListener('click', openModal);
  if (openFab) openFab.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('active')) closeModal(); });

  // Adjust form labels based on type
  typeSelect.addEventListener('change', () => {
    const t = typeSelect.value;
    const titleGroup = document.getElementById('entry-title-group');
    const bodyLabel = document.getElementById('entry-body-label');
    titleGroup.style.display = t === 'note' ? 'none' : 'block';
    const labels = { decision: 'Rationale / Details', milestone: 'Description', note: 'Note', outcome: 'What happened / What did we learn?' };
    bodyLabel.textContent = labels[t] || 'Details';
    const ph = { decision: 'Why was this decided...', milestone: 'What was achieved...', note: 'Share an observation or insight...', outcome: 'Results, data, and learnings...' };
    document.getElementById('entry-body').placeholder = ph[t] || '';
  });

  // Submit new entry
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const type = typeSelect.value;
    const title = document.getElementById('entry-title').value.trim();
    const body = document.getElementById('entry-body').value.trim();
    if (!body) return;

    const today = new Date();
    const dateStr = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const monthStr = today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    const newEntry = {
      id: Date.now(),
      type: type,
      title: type === 'note' ? '' : title,
      body: body.replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>'),
      author: 'You',
      avatar: 'var(--primary)',
      date: dateStr,
      month: monthStr,
      notes: []
    };

    entries.unshift(newEntry);
    activeFilter = 'all';
    document.querySelectorAll('.tl-pill').forEach(p => p.classList.remove('active'));
    document.querySelector('.tl-pill[data-filter="all"]').classList.add('active');
    render();

    // Animate the new entry in
    const firstEntry = feed.querySelector('.tl-entry, .tl-date-sep');
    if (firstEntry) {
      const newCards = [];
      let el = feed.firstElementChild;
      while (el && !el.classList.contains('tl-entry')) { el = el.nextElementSibling; }
      if (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(12px)';
        el.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
        requestAnimationFrame(() => { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; });
      }
    }

    closeModal();
  });

  // ── Initial render ──
  render();
})();
