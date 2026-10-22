/* Version 8 (CFO): #control, risk and control on one screen. Four answers to "what are we risking?", each with a
   check that ticks once the section is in view, and the rule the autopilot follows when it acts on its own. */
(() => {
  const host = document.getElementById('control'); if (!host) return;
  const lang = () => window.UI?.lang || document.documentElement.lang || 'de';
  const L = (en, de) => (lang() === 'de' ? de : en);
  const ph = n => `<i class="ph-light ph-${n}" aria-hidden="true"></i>`;
  const CARDS = () => [
    ['plugs-connected', L('Read-only', 'Lesend angebunden'), L('SAP and Biesterfeld CRM stay the systems of record. Nothing is migrated.', 'SAP und Biesterfeld CRM bleiben führend. Nichts wird migriert.')],
    ['user-check', L('A person approves', 'Ein Mensch gibt frei'), L('Offers, prices and orders go out with one approval click.', 'Angebote, Preise und Aufträge gehen mit einem Freigabeklick raus.')],
    ['chart-line-up', L('Measured, not promised', 'Gemessen, nicht versprochen'), L('Hours and margin against today, for one team in 30 days.', 'Stunden und Marge gegen heute, für ein Team in 30 Tagen.')],
    ['flag', L('No IT project', 'Kein IT-Projekt'), L('One grade family, one team. After 30 days you decide.', 'Eine Typenfamilie, ein Team. Nach 30 Tagen entscheiden Sie.')],
  ];
  const RULES = () => [[L('Request type', 'Art der Anfrage'), L('call-off, document', 'Abruf, Dokument')], [L('AI confidence', 'KI-Sicherheit'), '≥ 95 %'], [L('Margin', 'Marge'), L('≥ target margin', '≥ Zielmarge')], [L('Customer', 'Kunde'), L('existing', 'Bestandskunde')]];
  function render() {
    host.innerHTML = `<div class="wrap">
        <p class="ly-eyebrow reveal in">${ph('shield-check')}${L('Risk and control', 'Risiko und Kontrolle')}</p>
        <h2 class="h2 ct-h">${L('Small to start. <em>Nothing runs without your rules.</em>', 'Klein im Start. <em>Nichts läuft ohne Ihre Regeln.</em>')}</h2>
        <div class="ct-grid">
          <ol class="ct-cards">${CARDS().map(([ic, t, d], i) => `<li style="--i:${i}">${ph(ic)}<b>${t}</b><p>${d}</p><span class="ct-ok">${ph('check')}</span></li>`).join('')}</ol>
          <div class="ct-rule"><small>${L('The autopilot acts alone only when all of these hold', 'Der Autopilot handelt nur allein, wenn alles zutrifft')}</small>
            <table>${RULES().map(([k, v], i) => `<tr style="--i:${i}"><td>${k}</td><td>${v}</td><td>${ph('check-circle')}</td></tr>`).join('')}</table>
            <p>${L('Everything else waits for a person.', 'Alles andere wartet auf einen Menschen.')}</p></div>
        </div>
      </div>`;
  }
  render();
  new IntersectionObserver(([e]) => { if (e.isIntersecting) host.classList.add('on'); }, { threshold: .3 }).observe(host);
  window.UI?.onLang(render);
})();
