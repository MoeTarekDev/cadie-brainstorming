document.addEventListener('DOMContentLoaded', () => {
  const newExperimentBtn = document.getElementById('new-experiment-btn');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modal = document.getElementById('experiment-modal');
  const form = document.getElementById('new-experiment-form');

  // Open modal
  if (newExperimentBtn) {
    newExperimentBtn.addEventListener('click', () => {
      modal.classList.add('active');
      document.getElementById('exp-title').focus();
    });
  }

  // Close modal
  const closeModal = () => {
    modal.classList.remove('active');
    if (form) form.reset();
  };

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  // Close on outside click
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Handle form submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('exp-title').value;
      
      // Basic client-side simulation of adding
      const grid = document.getElementById('experiment-grid');
      if (grid) {
        const newCard = document.createElement('div');
        newCard.className = 'card';
        newCard.onclick = () => window.location.href = 'experiment.html';
        newCard.innerHTML = `
          <div class="card-image" style="background: linear-gradient(135deg, #831843 0%, #4c0519 100%); display:flex; align-items:center; justify-content:center; color:#f472b6;">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
          </div>
          <div class="card-content">
            <div class="flex items-center justify-between" style="margin-bottom: 8px;">
              <span class="badge">Draft</span>
              <span class="badge badge-warning">Exploration</span>
            </div>
            <h3 class="card-title">${title}</h3>
            <p class="card-desc">Just captured this experiment.</p>
            <div class="flex items-center gap-2" style="margin-top: 16px;">
              <div style="width: 20px; height: 20px; border-radius: 50%; background: var(--primary);"></div>
              <span class="text-xs text-muted">You • Just now</span>
            </div>
          </div>
        `;
        grid.prepend(newCard);
      }
      
      closeModal();
    });
  }

  // Handle Note Submission on Experiment Page
  const noteForm = document.getElementById('add-note-form');
  const notesList = document.getElementById('notes-list');

  if (noteForm && notesList) {
    noteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('note-input');
      const text = input.value.trim();
      
      if (!text) return;

      const noteDiv = document.createElement('div');
      noteDiv.className = 'activity-content';
      noteDiv.style.backgroundColor = 'var(--bg)';
      
      // Escape HTML to prevent basic XSS and replace newlines with breaks
      const escapedText = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\n/g, '<br>');

      noteDiv.innerHTML = `
        <div class="flex justify-between items-start">
          <div class="activity-header">
            <b>You</b>
          </div>
          <span class="activity-time">Just now</span>
        </div>
        <p class="text-sm" style="margin-top: 4px;">
          ${escapedText}
        </p>
      `;

      // Append to the list
      notesList.appendChild(noteDiv);
      
      // Clear the input
      input.value = '';
      
      // Small animation effect
      noteDiv.style.opacity = '0';
      noteDiv.style.transform = 'translateY(10px)';
      noteDiv.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      
      requestAnimationFrame(() => {
        noteDiv.style.opacity = '1';
        noteDiv.style.transform = 'translateY(0)';
      });
    });
  }

  // Handle Outcome Update on Experiment Page
  const outcomeModal = document.getElementById('outcome-modal');
  const openOutcomeBtn = document.getElementById('open-outcome-modal-btn');
  const closeOutcomeBtn = document.getElementById('close-outcome-modal-btn');
  const outcomeForm = document.getElementById('outcome-form');
  const deleteOutcomeBtn = document.getElementById('delete-outcome-btn');
  
  let currentEditingItem = null;

  const openOutcomeModalForEdit = (item) => {
    currentEditingItem = item;
    const statusText = item.querySelector('.status-text').textContent;
    const notesRaw = item.querySelector('.outcome-desc').getAttribute('data-raw');
    
    const statusSelect = document.getElementById('outcome-status');
    for (let i = 0; i < statusSelect.options.length; i++) {
      if (statusSelect.options[i].value === statusText) {
        statusSelect.selectedIndex = i;
        break;
      }
    }
    
    const unescaped = notesRaw
      .replace(/<br>/g, '\n')
      .replace(/&quot;/g, '"')
      .replace(/&gt;/g, '>')
      .replace(/&lt;/g, '<')
      .replace(/&amp;/g, '&');
      
    document.getElementById('outcome-notes').value = unescaped;
    
    if (deleteOutcomeBtn) deleteOutcomeBtn.style.display = 'block';
    
    outcomeModal.classList.add('active');
    document.getElementById('outcome-notes').focus();
  };

  // Attach listeners to existing edit buttons
  document.querySelectorAll('.edit-outcome-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const item = e.target.closest('.timeline-item');
      openOutcomeModalForEdit(item);
    });
  });

  if (openOutcomeBtn && outcomeModal) {
    openOutcomeBtn.addEventListener('click', () => {
      currentEditingItem = null;
      if (outcomeForm) outcomeForm.reset();
      if (deleteOutcomeBtn) deleteOutcomeBtn.style.display = 'none';
      outcomeModal.classList.add('active');
      document.getElementById('outcome-notes').focus();
    });
  }

  if (deleteOutcomeBtn) {
    deleteOutcomeBtn.addEventListener('click', () => {
      if (currentEditingItem) {
        currentEditingItem.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
        currentEditingItem.style.opacity = '0';
        currentEditingItem.style.transform = 'translateY(-10px)';
        setTimeout(() => {
          currentEditingItem.remove();
        }, 200);
        closeOutcomeModal();
      }
    });
  }

  const closeOutcomeModal = () => {
    if (outcomeModal) {
      outcomeModal.classList.remove('active');
      if (outcomeForm) outcomeForm.reset();
      currentEditingItem = null;
    }
  };

  if (closeOutcomeBtn) {
    closeOutcomeBtn.addEventListener('click', closeOutcomeModal);
  }

  if (outcomeModal) {
    outcomeModal.addEventListener('click', (e) => {
      if (e.target === outcomeModal) closeOutcomeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && outcomeModal && outcomeModal.classList.contains('active')) {
      closeOutcomeModal();
    }
  });

  if (outcomeForm) {
    outcomeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const statusSelect = document.getElementById('outcome-status');
      const selectedOption = statusSelect.options[statusSelect.selectedIndex];
      const statusText = selectedOption.value;
      const statusClass = selectedOption.getAttribute('data-class');
      
      const notesInput = document.getElementById('outcome-notes');
      const notesText = notesInput.value.trim();
      
      if (!notesText) return;

      const escapedNotes = notesText
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/\n/g, '<br>');

      // Update Main Badge
      const mainBadge = document.getElementById('main-status-badge');
      if (mainBadge) {
        mainBadge.className = 'badge ' + statusClass;
        mainBadge.textContent = statusText;
      }

      if (currentEditingItem) {
        // Edit existing
        currentEditingItem.querySelector('.status-text').textContent = statusText;
        const descEl = currentEditingItem.querySelector('.outcome-desc');
        descEl.setAttribute('data-raw', escapedNotes);
        descEl.innerHTML = escapedNotes;
      } else {
        // Add new to Timeline
        const timeline = document.getElementById('outcome-timeline');
        if (timeline) {
          const item = document.createElement('div');
          item.className = 'timeline-item';
          
          const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
          
          item.innerHTML = `
            <div class="flex justify-between items-start">
              <div class="font-medium">Status changed to <span class="status-text">${statusText}</span></div>
              <button class="btn btn-ghost btn-sm edit-outcome-btn" style="padding: 2px 6px; height: auto;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
            </div>
            <p class="text-sm text-muted">${today}</p>
            <p class="text-sm mt-2 outcome-desc" style="margin-top: 4px;" data-raw="${escapedNotes}">${escapedNotes}</p>
          `;
          
          // Attach edit listener to new item
          item.querySelector('.edit-outcome-btn').addEventListener('click', () => {
            openOutcomeModalForEdit(item);
          });
          
          item.style.opacity = '0';
          item.style.transform = 'translateY(10px)';
          item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

          timeline.insertBefore(item, timeline.firstChild);

          requestAnimationFrame(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          });
        }
      }
      
      closeOutcomeModal();
    });
  }
});


// Sidebar Logic
document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('app-sidebar');
  const toggleBtn = document.getElementById('toggle-sidebar-btn');
  const channelsBtn = document.getElementById('channels-dropdown-btn');
  const channelsContent = document.getElementById('channels-dropdown-content');


  // Check initial state on mobile
  if (window.innerWidth <= 768 && sidebar) {
    sidebar.classList.add('collapsed');
  }

  // Handle resize dynamically
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 768 && sidebar) {
      if (!sidebar.classList.contains('collapsed')) {
        sidebar.classList.add('collapsed');
      }
    }
  });


  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      
      // If collapsing, force close the dropdown
      if (sidebar.classList.contains('collapsed') && channelsContent) {
        channelsContent.style.display = 'none';
        channelsBtn.querySelector('.chevron').style.transform = 'rotate(0deg)';
      }
    });
  }

  if (channelsBtn && channelsContent) {
    channelsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // If sidebar is collapsed, expand it first
      if (sidebar.classList.contains('collapsed')) {
        sidebar.classList.remove('collapsed');
        setTimeout(() => {
          channelsContent.style.display = 'flex';
          channelsBtn.querySelector('.chevron').style.transform = 'rotate(180deg)';
        }, 300);
        return;
      }

      const isExpanded = channelsContent.style.display === 'flex';
      if (isExpanded) {
        channelsContent.style.display = 'none';
        channelsBtn.querySelector('.chevron').style.transform = 'rotate(0deg)';
      } else {
        channelsContent.style.display = 'flex';
        channelsBtn.querySelector('.chevron').style.transform = 'rotate(180deg)';
      }
    });
  }
});
