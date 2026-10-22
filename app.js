(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- menu ---------- */
  var ham = $('#ham'), menu = $('#menu');
  ham.addEventListener('click', function () {
    var o = menu.classList.toggle('otw');
    ham.setAttribute('aria-expanded', o ? 'true' : 'false');
  });
  $$('#menu a').forEach(function (a) { a.addEventListener('click', function () { menu.classList.remove('otw'); ham.setAttribute('aria-expanded', 'false'); }); });

  /* ---------- dolny pasek po przewinieciu za przyciski z hero/naglowka ---------- */
  var mob = $('#mob'), cta = $('#heroCta');
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (e) {
      var widac = !e[0].isIntersecting && e[0].boundingClientRect.top < 0;
      mob.classList.toggle('widac', widac);
    }, { threshold: 0 }).observe(cta);
  } else { mob.classList.add('widac'); }

  /* ---------- zakladki programow ---------- */
  $$('.zakl button').forEach(function (b) {
    b.addEventListener('click', function () {
      $$('.zakl button').forEach(function (x) { x.setAttribute('aria-selected', x === b ? 'true' : 'false'); });
      $$('.karty').forEach(function (k) { k.hidden = k.dataset.z !== b.dataset.z; });
    });
  });

  /* ---------- katalog: nazwy programow z obecnej strony glob.home.pl ----------
     d = liczba dni (z nazwy lub kategorii na stronie biura), t = transport (tylko gdy podany na stronie) */
  var SZKOLY = [
    ['Wycieczki jednodniowe', [
      ['Z wizytą w Centrum Nauki Kopernik', 1], ['Stadion Narodowy', 1], ['Królewskim Traktem', 1],
      ['Śladami Powstania Warszawskiego', 1], ['Niewidzialna Wystawa', 1], ['Warszawskie teatry, kina i muzea', 1],
      ['Puszcza Kampinoska', 1], ['Biebrzański Park Narodowy', 1], ['Farma Iluzji', 1],
      ['Twierdza Modlin', 1], ['Bałtowski Park Jurajski', 1], ['Kraina Krówek Ciągutek', 1]]],
    ['Wycieczki dwudniowe', [
      ['Toruń - miasto Kopernika', 2], ['Mazury - kraina zamków i jezior', 2], ['Łódź', 2],
      ['Olsztyn - Nidzica', 2], ['Ziemia Sandomierska', 2], ['Góry Świętokrzyskie', 2],
      ['Przez Wrota Podlasia na Suwalszczyznę', 2]]],
    ['Wycieczki trzydniowe', [
      ['Kraków - Zator - Wieliczka', 3], ['Bałtyk Express', 3], ['Tatry Express', 3], ['Wrocław', 3],
      ['Bieszczady - polski dziki zachód', 3], ['Zamość i Roztocze', 3], ['Piastowskim szlakiem: Biskupin - Gniezno - Poznań', 3],
      ['Warmia - kraina gotyku, zamków i jezior', 3]]],
    ['Wycieczki cztero- i pięciodniowe', [
      ['Pieniny i Gorce', 4], ['Mierzeja Helska + Słowiński Park Narodowy', 4], ['Bursztynowym szlakiem', 4],
      ['Wielkopolska - perła turystyki', 4], ['Na spotkanie z Królem Karkonoszem', 5], ['A może w Beskidy?', 5], ['Szczecin i okolice', 5]]],
    ['Wycieczki zagraniczne', [
      ['Lwów - 3 dni', 3, 'eu'], ['Wilno, Troki, Druskienniki - 3 dni', 3, 'eu'], ['Złota Praga - 4 dni', 4, 'eu'],
      ['Bratysława i Wiedeń - 4 dni', 4, 'eu'], ['Berlin, Poczdam i Heide Park - 5 dni', 5, 'eu'], ['Poprad, Budapeszt i Balaton - 5 dni', 5, 'eu']]]
  ];
  var FIRMY = [
    ['Wyjazdy zagraniczne', [
      ['Liguria - 4 dni', 4, 'eu'], ['Albania - 5 dni', 5, 'eu'], ['Czarnogóra - 5 dni', 5, 'eu'], ['Chorwacja i Bośnia - 5 dni', 5, 'eu'],
      ['Chorwacja - 7 dni (autokarem)', 7, 'eu'], ['Bałkańska przygoda - 9 dni (autokarem)', 9, 'eu'],
      ['Bawaria, Tyrol i Północne Włochy - 10 dni (autokarem)', 10, 'eu'], ['Litwo, Ojczyzno moja - 3 dni', 3, 'eu'],
      ['Złota Praga i nie tylko - 4 dni', 4, 'eu'], ['W rytmie walca: Bratysława - Wiedeń - 4 dni', 4, 'eu'],
      ['Polak Węgier - dwa bratanki: Budapeszt, Eger, Balaton - 4 dni', 4, 'eu'], ['Śladami Drakuli - 6 dni', 6, 'eu'], ['Madryt - 4 dni', 4, 'eu'], ['Andaluzja - zwiedzanie i wypoczynek', 0, 'eu']]],
    ['Samolotem', [
      ['Rzym - 4 dni (samolotem)', 4, 'lot'], ['Paryż - 4 dni (samolotem)', 4, 'lot'],
      ['Barcelona - 5 dni (samolotem)', 5, 'lot'], ['Portugalia - w rytmie Fado - 6 dni', 6, 'lot'], ['Grecja - 7 dni (samolotem)', 7, 'lot'],
      ['Gruzja - 8 dni', 8, 'lot']]],
    ['Bałtyk i Skandynawia', [
      ['Promem do Sztokholmu - 4 dni', 4, 'prom'], ['Mostem do Kopenhagi - 4 dni', 4, 'eu'],
      ['Perły Bałtyku - 5 dni', 5, 'eu'], ['Bałtyckie Stolice - 6 dni', 6, 'prom']]]
  ];
  var NARTY = 'Narty 2027 - Kronplatz i Alta Badia';
  var SPECJALNE = [
    ['Inne', [[NARTY, 8, 'narty'], ['Wczasy u touroperatora', 0, 'wczasy'], ['Bilety lotnicze, promowe lub autokarowe', 0, 'bilety'], ['Własny pomysł na trasę', 0, 'wlasny']]]
  ];

  /* ---------- PRZYKLADOWE stawki do orientacyjnej wyceny (do zastapienia cennikiem biura) ---------- */
  var STAWKI = {
    pl:   { autokar1: 1900, autokarDzien: 2400, noc: [150, 210], program: [40, 70], oplaty: [15, 25] },
    eu:   { autokar1: 2600, autokarDzien: 3000, noc: [220, 320], program: [60, 110], oplaty: [25, 40] },
    prom: { autokar1: 2600, autokarDzien: 3000, noc: [260, 380], program: [60, 110], oplaty: [25, 40] }
  };

  var st = { grupa: 'szkola', transport: 'pl', program: 'Kraków - Zator - Wieliczka' };
  var sel = $('#program'), wlasnyBox = $('#wlasnyBox');
  var MAPA = {};

  function zbuduj() {
    var listy = st.grupa === 'szkola' ? SZKOLY : st.grupa === 'firma' ? FIRMY.concat([SZKOLY[1], SZKOLY[2]]) :
      st.grupa === 'grupa' ? FIRMY.concat([SZKOLY[1], SZKOLY[2], SZKOLY[3]]) : [];
    if (st.grupa === 'rodzina') listy = [['Inne', [['Wczasy u touroperatora', 0, 'wczasy'], ['Bilety lotnicze, promowe lub autokarowe', 0, 'bilety'], [NARTY, 8, 'narty'], ['Własny pomysł na trasę', 0, 'wlasny']]]];
    else listy = listy.concat(SPECJALNE);
    sel.innerHTML = '';
    MAPA = {};
    listy.forEach(function (g) {
      var og = document.createElement('optgroup');
      og.label = g[0];
      g[1].forEach(function (p) {
        var o = document.createElement('option');
        o.value = o.textContent = p[0];
        MAPA[p[0]] = p;
        og.appendChild(o);
      });
      sel.appendChild(og);
    });
    if (!MAPA[st.program]) st.program = sel.options[0].value;
    sel.value = st.program;
  }

  function ustawSeg(pole, v) {
    st[pole] = v;
    $$('.seg[data-pole="' + pole + '"] button').forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.v === v ? 'true' : 'false'); });
  }

  function wybierzProgram(nazwa, zDni) {
    st.program = nazwa;
    var p = MAPA[nazwa];
    if (!p) return;
    if (p[1] && zDni !== false) $('#dni').value = p[1];
    if (p[2] && ['pl', 'eu', 'lot', 'prom'].indexOf(p[2]) > -1) ustawSeg('transport', p[2]);
    else if (!p[2]) ustawSeg('transport', 'pl');
  }

  function grupaUI() {
    var szk = st.grupa === 'szkola';
    $('#opBox').hidden = !szk;
    $('#lblUcz').textContent = szk ? 'Uczniowie' : 'Uczestnicy';
    $('#lblNazwa').textContent = szk ? 'Szkoła' : st.grupa === 'firma' ? 'Firma lub urząd' : st.grupa === 'grupa' ? 'Nazwa grupy' : 'Nazwisko';
    $('#nazwa').placeholder = szk ? 'np. SP nr 1, klasy 6a i 6b' : st.grupa === 'firma' ? 'np. Urząd Gminy' : st.grupa === 'grupa' ? 'np. Koło emerytów' : 'np. Kowalscy';
  }

  /* terminy: najblizsze 14 miesiecy */
  (function () {
    var m = ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'];
    var d = new Date(), t = $('#termin');
    var o0 = document.createElement('option'); o0.value = ''; o0.textContent = 'jeszcze nie wiem'; t.appendChild(o0);
    for (var i = 1; i <= 14; i++) {
      var x = new Date(d.getFullYear(), d.getMonth() + i, 1);
      var o = document.createElement('option');
      o.value = o.textContent = m[x.getMonth()] + ' ' + x.getFullYear();
      t.appendChild(o);
    }
    t.value = t.options[7].value;
  })();

  function liczba(id, min, max) {
    var v = parseInt($(id).value, 10);
    if (isNaN(v)) v = min;
    return Math.max(min, Math.min(max, v));
  }
  function zl(n) { return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' zł'; }
  function r10(n) { return Math.round(n / 10) * 10; }
  function osobyTxt(n) { return n === 1 ? '1 osoba' : (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) ? n + ' osoby' : n + ' osób'; }
  function dniTxt(n) { return n === 1 ? '1 dzień' : n + ' dni'; }

  var TR = { pl: 'autokarem po Polsce', eu: 'autokarem za granicę', lot: 'samolotem', prom: 'promem' };

  function licz() {
    var p = MAPA[st.program] || [st.program, 0];
    var typ = p[2];
    var specjalny = typ === 'narty' || typ === 'wczasy' || typ === 'bilety';
    wlasnyBox.hidden = typ !== 'wlasny';
    $('#trBox').hidden = specjalny;
    $('#dniBox').hidden = specjalny;
    var dni = liczba('#dni', 1, 14);
    var n = liczba('#osoby', 1, 300);
    var op = st.grupa === 'szkola' ? liczba('#opiekunowie', 0, 30) : 0;
    var budzet = parseInt($('#budzet').value, 10);
    var termin = $('#termin').value;
    var nazwaTrasy = typ === 'wlasny' ? ($('#wlasny').value.trim() || 'własna trasa') : st.program;

    $('#wTytul').textContent = nazwaTrasy;
    var meta = [];
    if (!specjalny || typ === 'narty') meta.push(typ === 'narty' ? '30.01 - 6.02.2027, autokarem' : dniTxt(dni) + ', ' + TR[st.transport]);
    meta.push(osobyTxt(n) + (op ? ' + ' + op + ' opiek.' : ''));
    if (termin && typ !== 'narty') meta.push(termin);
    $('#wMeta').textContent = meta.join(' · ');

    var cena = $('#wCena'), rozb = $('#wRozb'), wb = $('#wBudzet');
    rozb.innerHTML = ''; wb.hidden = true;
    var lo = 0, hi = 0, opis = '';

    if (typ === 'narty') {
      /* cena z obecnej strony biura (oferta Narty 2027) */
      cena.innerHTML = '<div class="kw">675 EUR + 1 350 zł <small>/ osoba</small></div><p class="razem">Zaliczka 500 zł od osoby. Cena z aktualnej oferty biura.</p>';
      opis = 'Cena z oferty: 675 EUR + 1350 zł od osoby, zaliczka 500 zł.';
    } else if (typ === 'wczasy' || typ === 'bilety') {
      cena.innerHTML = '<p class="info">' + (typ === 'wczasy'
        ? 'Ceny wczasów zmieniają się codziennie. Sprawdzimy aktualną ofertę touroperatorów na wybrany termin i oddzwonimy.'
        : 'Ceny biletów sprawdzamy w dniu zapytania. Proszę podać trasę i daty w uwagach.') + '</p>';
    } else if (st.transport === 'lot') {
      cena.innerHTML = '<p class="info">Przy wyjazdach samolotem koszt zależy od cen biletów lotniczych w danym dniu. Przygotujemy wycenę indywidualną w ciągu jednego dnia roboczego.</p>';
    } else {
      var s = STAWKI[st.transport] || STAWKI.pl;
      var razem = n + op;
      var autokary = Math.ceil((razem + 1) / 50);
      var maly = razem <= 30 ? 0.75 : 1;
      var autokar = (dni === 1 ? s.autokar1 : s.autokarDzien * dni) * autokary * maly;
      var noce = dni - 1;
      var noc = [s.noc[0] * noce * razem, s.noc[1] * noce * razem];
      var prog = [s.program[0] * dni * razem, s.program[1] * dni * razem];
      var opl = [s.oplaty[0] * dni * razem, s.oplaty[1] * dni * razem];
      lo = r10((autokar * 0.95 + noc[0] + prog[0] + opl[0]) / n);
      hi = r10((autokar * 1.1 + noc[1] + prog[1] + opl[1]) / n);
      cena.innerHTML = '<div class="kw">' + zl(lo) + ' - ' + zl(hi) + ' <small>/ ' + (op ? 'uczeń' : 'osoba') + '</small></div>' +
        '<p class="razem">Razem dla grupy ok. ' + zl(r10(lo * n)) + ' - ' + zl(r10(hi * n)) + (op ? ', opiekunowie bez opłat' : '') + '</p>';
      var li = function (a, b) { rozb.insertAdjacentHTML('beforeend', '<li><span>' + a + '</span><b>' + b + '</b></li>'); };
      li('Autokar' + (autokary > 1 ? ' (' + autokary + ' szt.)' : maly < 1 ? ' (mniejszy)' : ''), zl(r10(autokar / n)) + ' / os.');
      if (noce) li('Noclegi z wyżywieniem, ' + noce + (noce === 1 ? ' noc' : noce < 5 ? ' noce' : ' nocy'), zl(r10(noc[0] / n)) + ' - ' + zl(r10(noc[1] / n)));
      li('Bilety wstępu i przewodnicy', zl(r10(prog[0] / n)) + ' - ' + zl(r10(prog[1] / n)));
      li('Pilot i ubezpieczenie', zl(r10(opl[0] / n)) + ' - ' + zl(r10(opl[1] / n)));
      opis = 'Orientacyjnie z kreatora: ' + lo + '-' + hi + ' zł za osobę.';
      if (!isNaN(budzet) && budzet > 0) {
        wb.hidden = false;
        if (budzet >= hi) wb.textContent = 'Budżet ' + zl(budzet) + ' na osobę wystarcza z zapasem.';
        else if (budzet >= lo) wb.textContent = 'Budżet ' + zl(budzet) + ' mieści się w widełkach. Dobierzemy noclegi i atrakcje pod tę kwotę.';
        else wb.textContent = 'Budżet ' + zl(budzet) + ' jest poniżej widełek. Zaproponujemy krótszy wariant albo tańszy nocleg.';
      }
    }

    /* tresc zapytania */
    var L = [];
    L.push('Dzień dobry,');
    L.push('proszę o ofertę wyjazdu:');
    L.push('');
    L.push('Kto jedzie: ' + { szkola: 'szkoła', firma: 'firma / urząd', grupa: 'grupa zorganizowana', rodzina: 'rodzina / znajomi' }[st.grupa] + ($('#nazwa').value.trim() ? ', ' + $('#nazwa').value.trim() : ''));
    L.push('Wyjazd: ' + nazwaTrasy);
    if (!specjalny) L.push('Długość i transport: ' + dniTxt(dni) + ', ' + TR[st.transport]);
    L.push('Liczba osób: ' + n + (op ? ' uczniów + ' + op + ' opiekunów' : ''));
    if (typ !== 'narty') L.push('Termin: ' + (termin || 'do ustalenia'));
    if (!isNaN(budzet) && budzet > 0) L.push('Budżet: do ' + budzet + ' zł na osobę');
    if (opis) L.push(opis);
    if ($('#uwagi').value.trim()) L.push('Uwagi: ' + $('#uwagi').value.trim());
    L.push('');
    L.push('Kontakt: ' + ($('#kontakt').value.trim() || '(proszę podać imię i telefon)'));
    var tekst = L.join('\n');
    $('#wTekst').textContent = tekst;
    $('#wMail').href = 'mailto:glob@home.pl?subject=' + encodeURIComponent('Zapytanie o wyjazd: ' + nazwaTrasy) + '&body=' + encodeURIComponent(tekst);
  }

  /* zdarzenia */
  $$('.seg').forEach(function (g) {
    g.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      ustawSeg(g.dataset.pole, b.dataset.v);
      if (g.dataset.pole === 'grupa') { zbuduj(); wybierzProgram(sel.value, true); grupaUI(); }
      licz();
    });
  });
  sel.addEventListener('change', function () { wybierzProgram(sel.value); licz(); });
  $$('.licznik button').forEach(function (b) {
    b.addEventListener('click', function () {
      var i = $('#' + b.dataset.d);
      var v = (parseInt(i.value, 10) || 0) + parseInt(b.dataset.k, 10);
      i.value = Math.max(+i.min, Math.min(+i.max, v));
      licz();
    });
  });
  $$('#kr input, #kr select').forEach(function (i) { if (i !== sel) i.addEventListener('input', licz); });

  $('#wKopiuj').addEventListener('click', function () {
    var b = this, t = $('#wTekst').textContent;
    var ok = function () { b.textContent = 'Skopiowano'; setTimeout(function () { b.textContent = 'Skopiuj treść zapytania'; }, 1800); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(ok, function () {});
    else { var a = document.createElement('textarea'); a.value = t; document.body.appendChild(a); a.select(); try { document.execCommand('copy'); ok(); } catch (e) {} a.remove(); }
  });

  /* przyciski "Zapytaj o ten wyjazd" w kartach i w sekcji Narty */
  $$('.kbtn').forEach(function (b) {
    b.addEventListener('click', function () {
      ustawSeg('grupa', b.dataset.g);
      st.program = b.dataset.p;
      zbuduj(); grupaUI(); wybierzProgram(b.dataset.p); licz();
      document.getElementById('zapytanie').scrollIntoView({ behavior: 'smooth' });
    });
  });

  zbuduj(); grupaUI(); wybierzProgram(st.program); licz();
})();
