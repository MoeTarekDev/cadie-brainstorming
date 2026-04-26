import os
import re

html_files = ['index.html', 'collections.html', 'search.html', 'activity.html', 'experiment.html', 'collections-hybrid.html']

sidebar_template = """  <!-- Sidebar -->
  <aside class="sidebar" id="app-sidebar">
    <div class="brand-header">
      <div class="brand" style="margin-bottom: 0;">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
        <span>Cadie</span>
      </div>
      <button class="btn btn-ghost" id="toggle-sidebar-btn" style="padding: 4px; height: 32px; width: 32px; display: flex; align-items: center; justify-content: center;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
      </button>
    </div>
    
    <nav class="flex-col gap-2" style="width: 100%;">
      <a href="index.html" class="nav-link {ACTIVE_INDEX}">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        <span>Experiments</span>
      </a>
      <a href="collections.html" class="nav-link {ACTIVE_COLLECTIONS}">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
        <span>Collections</span>
      </a>
      <a href="search.html" class="nav-link {ACTIVE_SEARCH}">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <span>Search</span>
      </a>
      <a href="activity.html" class="nav-link {ACTIVE_ACTIVITY}">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
        <span>Activity</span>
      </a>
      
      <!-- Channels Dropdown -->
      <div class="nav-dropdown">
        <a href="#" class="nav-link {ACTIVE_CHANNELS}" id="channels-dropdown-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>
          <span>Channels</span>
          <svg class="chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left: auto; transition: transform 0.2s;"><polyline points="6 9 12 15 18 9"/></svg>
        </a>
        <div class="dropdown-content" id="channels-dropdown-content" style="display: none; flex-direction: column; padding-left: 28px; gap: 2px; margin-top: 4px;">
          <div class="text-xs text-muted" style="margin-top: 8px; margin-bottom: 4px; text-transform: uppercase;">Core Product</div>
          <a href="collections-hybrid.html" class="nav-link" style="font-size: 13px; padding: 4px 8px;"><span># Checkout</span></a>
          <a href="collections-hybrid.html" class="nav-link" style="font-size: 13px; padding: 4px 8px;"><span># Onboarding</span></a>
          <a href="collections-hybrid.html" class="nav-link" style="font-size: 13px; padding: 4px 8px;"><span># Core UI</span></a>
          <div class="text-xs text-muted" style="margin-top: 8px; margin-bottom: 4px; text-transform: uppercase;">Innovation</div>
          <a href="collections-hybrid.html" class="nav-link" style="font-size: 13px; padding: 4px 8px;"><span># AI Features</span></a>
          <div class="text-xs text-muted" style="margin-top: 8px; margin-bottom: 4px; text-transform: uppercase;">Growth</div>
          <a href="collections-hybrid.html" class="nav-link" style="font-size: 13px; padding: 4px 8px;"><span># Growth</span></a>
          <a href="collections-hybrid.html" class="nav-link" style="font-size: 13px; padding: 4px 8px;"><span># Retention</span></a>
        </div>
      </div>
    </nav>
  </aside>"""

base_dir = r"c:\Users\Office\Desktop\brainstorming-cadie"

for f in html_files:
    path = os.path.join(base_dir, f)
    with open(path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    content = re.sub(r'<!-- Sidebar -->.*?<\/aside>', sidebar_template, content, flags=re.DOTALL)
    content = re.sub(r'<!-- Global Sidebar \(Icon only\) -->.*?<\/aside>', sidebar_template, content, flags=re.DOTALL)
    
    content = content.replace('{ACTIVE_INDEX}', 'active' if f == 'index.html' else '')
    content = content.replace('{ACTIVE_COLLECTIONS}', 'active' if f == 'collections.html' else '')
    content = content.replace('{ACTIVE_SEARCH}', 'active' if f == 'search.html' else '')
    content = content.replace('{ACTIVE_ACTIVITY}', 'active' if f == 'activity.html' else '')
    content = content.replace('{ACTIVE_CHANNELS}', 'active' if f == 'collections-hybrid.html' else '')
    
    with open(path, 'w', encoding='utf-8') as file:
        file.write(content)

print("Updated HTML files.")

style_path = os.path.join(base_dir, "style.css")
with open(style_path, 'r', encoding='utf-8') as f:
    css = f.read()

css = re.sub(
    r'\.sidebar \{[\s\S]*?flex-shrink: 0;\n\}',
    r'.sidebar {\n  width: 250px;\n  background-color: var(--surface);\n  border-right: 1px solid var(--border);\n  padding: var(--space-4) var(--space-4);\n  display: flex;\n  flex-direction: column;\n  flex-shrink: 0;\n  transition: width 0.3s ease, padding 0.3s ease;\n  overflow-y: auto;\n  overflow-x: hidden;\n}\n\n.brand-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n  margin-bottom: var(--space-6);\n}\n\n.sidebar.collapsed {\n  width: 72px;\n  padding: var(--space-4) 0;\n  align-items: center;\n}\n.sidebar.collapsed .brand { display: none; }\n.sidebar.collapsed .nav-link span,\n.sidebar.collapsed .chevron,\n.sidebar.collapsed .nav-dropdown .dropdown-content { display: none !important; }\n.sidebar.collapsed .nav-link { justify-content: center; padding: var(--space-3); width: 48px; }\n.sidebar.collapsed .nav-link svg { margin-right: 0; }\n.sidebar.collapsed .brand-header { justify-content: center; }',
    css
)

responsive_css = """/* Responsive Design */
@media (max-width: 768px) {
  .sidebar {
    position: absolute;
    height: 100vh;
    z-index: 200;
  }
  .sidebar.collapsed {
    width: 72px;
  }
  .main-content {
    margin-left: 72px;
    width: calc(100vw - 72px);
  }
  
  .header {
    flex-direction: column;
    align-items: stretch;
    gap: var(--space-4);
    margin-bottom: var(--space-6);
  }
  .search-bar { max-width: 100%; }
  .header > .flex { width: 100%; }
  .header > .flex > .btn { width: 100%; }

  main > .flex.items-center.justify-between {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-4);
  }
  main > .flex.items-center.justify-between > .flex.gap-2 {
    width: 100%;
    flex-direction: row;
  }
  main > .flex.items-center.justify-between > .flex.gap-2 > .btn {
    flex: 1;
  }
  
  .detail-title { font-size: 24px; }
  .detail-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-2);
  }
  .detail-meta .btn { margin-left: 0 !important; width: 100%; margin-top: var(--space-2); }
  .content-section > .flex.gap-4 { flex-direction: column; gap: var(--space-2); }
  .content-section > .flex.gap-4 > .btn { width: 100%; }
  .activity-feed::before { left: 15px; }
  .activity-icon { width: 32px; height: 32px; }
  .activity-icon svg { width: 16px; height: 16px; }
  .activity-content { width: 100%; overflow: hidden; }
  .huge-search { font-size: 24px; }
  .modal-content { max-width: calc(100% - 32px); margin: 16px; padding: var(--space-4); }
  #new-experiment-form > .flex.gap-4 { flex-direction: column; gap: var(--space-4); }
  #search-results-grid .card.flex { flex-direction: column; }
  #search-results-grid .card.flex > div:first-child { width: 100% !important; height: 80px; border-right: none !important; border-bottom: 1px solid var(--border); }
}"""

css = re.sub(r'/\* Responsive Design \*/[\s\S]*', responsive_css, css)

with open(style_path, 'w', encoding='utf-8') as f:
    f.write(css)

hybrid_path = os.path.join(base_dir, "collections-hybrid.html")
with open(hybrid_path, 'r', encoding='utf-8') as f:
    hybrid = f.read()

hybrid_responsive = """    /* Mobile responsive for hybrid */
    @media (max-width: 768px) {
      .inner-sidebar {
        width: calc(100vw - 72px);
        height: auto;
        order: 1;
        border-right: none;
        border-bottom: 1px solid var(--border);
      }
      .inner-sidebar-header { display: none; }
      .inner-sidebar-content {
        display: flex;
        flex-direction: row;
        padding: var(--space-3) var(--space-4);
        overflow-x: auto;
        overflow-y: hidden;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
      }
      .inner-sidebar-content::-webkit-scrollbar { display: none; }
      .collection-group-title { display: none !important; }
      .collection-link {
        margin-bottom: 0;
        margin-right: var(--space-2);
        padding: 6px 14px;
        background-color: var(--bg);
        border: 1px solid var(--border);
        border-radius: 20px;
        white-space: nowrap;
      }
      .collection-link.active {
        background-color: var(--text);
        color: var(--bg);
        border-color: var(--text);
      }
      .collection-link.active .hash { color: var(--bg) !important; opacity: 0.5; }
      .collection-link:last-child { margin-right: 0; }
      
      .main-content { order: 2; width: calc(100vw - 72px); }
      .header-hybrid { flex-direction: column; align-items: flex-start; height: auto; padding: var(--space-4); gap: var(--space-4); }
      .header-hybrid .flex.gap-2 { width: 100%; }
      .header-hybrid .btn { flex: 1; }
      .scroll-area { padding: var(--space-4); }
    }"""
hybrid = re.sub(r'/\* Mobile responsive for hybrid \*/[\s\S]*?\}\n    \}', hybrid_responsive, hybrid)

hybrid = re.sub(r'/\* Global Sidebar overrides \*/[\s\S]*?/\* Inner Sidebar \(Collections List\) \*/', '/* Inner Sidebar (Collections List) */', hybrid)

hybrid = hybrid.replace('.main-content {\n      flex: 1;\n', '.main-content {\n      flex: 1;\n      min-width: 0;\n')

with open(hybrid_path, 'w', encoding='utf-8') as f:
    f.write(hybrid)

app_path = os.path.join(base_dir, "app.js")
with open(app_path, 'r', encoding='utf-8') as f:
    app_js = f.read()

sidebar_js = """

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
"""

if "Sidebar Logic" not in app_js:
    with open(app_path, 'a', encoding='utf-8') as f:
        f.write(sidebar_js)

print("App.js updated.")
