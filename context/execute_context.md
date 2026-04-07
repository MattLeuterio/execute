Contesto per Execute

Puoi creare una cartella chiamata context all’interno della tua codebase per conservare i file di contesto. Questo nome è breve, descrittivo e segue le convenzioni di molti progetti (cartella dedicata ai documenti di riferimento). Qui sotto trovi il contesto completo da incollare in un file Markdown, che potrai salvare dentro quella cartella.

⸻

1. Visione del prodotto

Execute è un sistema che aiuta le persone a seguire un piano ogni giorno. Nella prima versione si concentra sulla nutrizione, ma in futuro potrà espandersi a fitness, abitudini e altri aspetti della disciplina personale. L’idea centrale è che le persone falliscono non perché il piano sia sbagliato, ma perché non lo seguono con costanza.

Per questa ragione, Execute non è:
	•	un’app di conteggio calorie;
	•	un generico tracker nutrizionale;
	•	un gestionale clinico enterprise;
	•	un sistema di cartelle cliniche.

È invece:
	•	un prodotto che dà priorità al comportamento;
	•	un sistema di disciplina;
	•	una piattaforma per seguire quotidianamente un piano;
	•	uno strumento semplice che aiuta a mantenere la costanza.

2. Posizionamento del prodotto

L’obiettivo principale sono i nutrizionisti, i coach nutrizionali e i personal trainer che assegnano piani alimentari. I clienti finali (persone che seguono i piani) rappresentano l’utenza secondaria. Il modello di business è B2B SaaS: paga il nutrizionista, l’utente finale usa gratis.

La proposizione di valore è chiara: “I tuoi clienti non ricevono solo un piano. Lo seguono davvero”. Execute non deve essere percepito come uno strumento di gestione clienti, né come un semplice documento digitale. Le parole chiave sono aderenza, consistenza ed esecuzione giornaliera.

3. Ambito dell’MVP

Per il lancio si parte con la sola nutrizione. L’app avrà due lati:

A. Parte pubblica (marketing)
	•	Landing page per spiegare il prodotto, raccogliere interesse e presentare la value proposition.

B. Parte privata (applicazione)
	•	Dashboard per il nutrizionista;
	•	Esperienza per il cliente;
	•	Gestione dei piani alimentari;
	•	Monitoraggio dell’aderenza.

Funzionalità MVP:

Client:
	1.	Today – schermata principale con i pasti da completare;
	2.	Plan – visualizzazione del piano settimanale;
	3.	Progress – panoramica di streak e aderenza.

Nutrizionista:
	1.	Dashboard – vista clienti e stato attuale;
	2.	Clients – lista e dettaglio clienti;
	3.	Plan Editor – creazione e modifica piani semplici.

Cosa NON includere nel MVP:
	•	ricerca del database calorie;
	•	scanner di codici a barre;
	•	pagamenti e fatturazione;
	•	telemedicina o videochiamate;
	•	chat complessa;
	•	generazione piani via AI;
	•	analytics avanzate;
	•	white-labeling;
	•	moduli fitness o abitudini;
	•	social o funzionalità comunitarie.

4. Brand e tono

Nome pubblico: Execute
Dominio: executebase.com
Il nome ExecuteBase resta solo un riferimento tecnico; nell’interfaccia utente e nel marketing si usa sempre Execute.

Tono di voce: chiaro, calmo, diretto, disciplinato, minimale e premium. Evitare tono urlato, esagerato, stile “palestra” o motivazionale finto. Il prodotto deve trasmettere controllo, sicurezza, pulizia, serietà, modernità e un’estetica simile ad Apple. Non deve apparire come app fitness aggressiva, software medico sterile o applicazione per bambini.

Linea di brand principale: Follow your plan. Step by step.
Linea di supporto: The simplest way to help your clients stick to their diet.

5. Direzione di design

Il design deve essere:
	•	mobile-first;
	•	minimale e premium;
	•	ispirato all’estetica Apple;
	•	con ampio uso di spazi e gerarchia tipografica;
	•	senza ingombri o affollamento;
	•	con angoli smussati e uso moderato dei colori.

Principio base: Completion > Complexity. Meglio poche azioni chiare, piuttosto che molte funzionalità ridondanti. L’interfaccia deve facilitare la comprensione rapida, la priorità delle informazioni e la riduzione dell’attrito.

6. Direzione colori
	•	Base: toni scuri, quasi neri o grigi antracite;
	•	Accent: verde naturale, calmo e premium (no neon, no verde ospedale);
	•	Feedback: verde per completato, arancione per in sospeso, rosso solo per errori reali;
	•	l’app deve evocare nutrizione e disciplina, non aggressività fitness o freddezza medica.

7. Stack tecnologico

Il progetto usa:
	•	Next.js con App Router;
	•	TypeScript;
	•	Tailwind CSS;
	•	shadcn/ui per i componenti UI di base (e come base del design system);
	•	Supabase per database, autenticazione e Row Level Security;
	•	React Hook Form + Zod per la gestione dei form e la validazione;
	•	Lucide per le icone;
	•	date-fns per la gestione delle date.

Non si utilizza styled-components. L’identità visiva del prodotto si costruisce sopra shadcn/ui con Tailwind.

8. Struttura della piattaforma

L’applicazione si divide in due zone:
	1.	Landing pubblica – presente su executebase.com, serve per spiegare e promuovere Execute.
	2.	App privata – su un sottodominio o path dedicato (es. app.executebase.com), dove si accede con login.

È comunque possibile iniziare con landing e app nello stesso progetto, con gruppo di rotte separato, ma la separazione dovrà essere possibile in futuro.

9. Landing page

La landing deve:
	•	spiegare chiaramente il valore;
	•	mostrare come Execute aiuta i clienti a seguire un piano;
	•	rivolgersi prima ai nutrizionisti;
	•	apparire premium e credibile;
	•	evitare fluff, testimonianze false o linguaggio da startup gonfiata.

Sezioni consigliate:
	1.	Hero – nome, headline, descrizione e call-to-action;
	2.	Problema – spiegare che le persone non falliscono per mancanza di piano ma di aderenza;
	3.	Come funziona – tre step: crea piano, seguilo ogni giorno, traccia aderenza;
	4.	Anteprima prodotto – schermate di Today, progressi, pasti;
	5.	Prezzi – tre opzioni 9/19/39 € al mese;
	6.	CTA finale.

10. Architettura dell’applicazione

Client App
	1.	Today – schermata principale con i pasti da fare e la percentuale di completamento;
	2.	Plan – piano settimanale in sola lettura;
	3.	Progress – visualizzazione di streak, aderenza e, eventualmente, metriche corporee di base.

Nutrizionista App
	1.	Dashboard – overview dei clienti e stato attuale;
	2.	Clients – lista clienti e ricerca;
	3.	Client Detail – info e progresso del singolo cliente;
	4.	Plan Editor – editor di piani semplice e veloce.

11. Esperienza utente (client)

La schermata Today deve rispondere a quattro domande: cosa devo fare oggi, cosa ho fatto, cosa manca e quanto manca per completare la giornata. Contiene saluto, indicatore di completamento, elenco pasti con stato (completato o no) e azione per segnare il giorno come completato.

La schermata Plan mostra il piano settimanale in maniera leggibile, mentre la schermata Progress mostra streak giornalieri, aderenza settimanale e storia delle metriche.

12. Esperienza utente (nutrizionista)

La Dashboard permette di capire rapidamente chi sta seguendo il piano e chi no. Il Client Detail mostra informazioni, piano attivo e progresso. Il Plan Editor deve essere semplice, senza database complessi: l’importante è creare un piano veloce e assegnarlo al cliente.

13. Dati e autorizzazioni

Supabase gestisce database e autenticazione. L’accesso deve essere basato su Row Level Security: ogni nutrizionista vede solo i propri clienti e i propri piani; ogni cliente vede solo il proprio piano e i propri progressi. Non bisogna modellare la scienza nutrizionale: il focus è l’aderenza.

14. Principi di UX
	1.	Poche scelte;
	2.	Gerarchia forte;
	3.	Comprensione veloce;
	4.	Basso attrito;
	5.	Assenza di ingombro;
	6.	Navigazione minima;
	7.	Stati di completamento chiari;
	8.	Tono amichevole ma controllato;
	9.	Belle preimpostazioni;
	10.	Mobile-first sempre.

15. Principi del design system

Usare shadcn/ui come base, senza rendere l’app generica. Occorre costruire un proprio livello di astrazione con:
	•	pulsanti personalizzati;
	•	card su misura;
	•	elementi della lista pasti;
	•	componenti per il progresso;
	•	layout (header, bottom nav, ecc.);
	•	regole tipografiche e di spaziatura.

La spaziatura deve essere deliberata e la tipografia deve guidare la gerarchia visiva. L’uso del colore deve essere parsimonioso e intenzionale.

16. Cosa fare come step successivo

In qualità di designer e ingegnere, le attività iniziali sono:
	1.	Preparare un sommario finale del prodotto;
	2.	Definire la direzione di design;
	3.	Costruire uno schema del contenuto della landing;
	4.	Creare l’architettura delle informazioni dell’applicazione;
	5.	Definire la struttura di cartelle per Next.js (App Router);
	6.	Creare l’inventario dei componenti UI basati su Tailwind + shadcn;
	7.	Pianificare la prima implementazione.

17. Note importanti per l’implementazione

Non costruire tutto in una volta. Siamo nella fase 1: brand definito, dominio acquistato, direzione di design scelta e primo focus sulla nutrizione. Le priorità immediate sono realizzare la landing, definire la struttura dell’applicazione e predisporre correttamente le fondamenta del prodotto.

18. Sintesi del prodotto

Execute nasce come piattaforma per l’aderenza ai piani nutrizionali. I nutrizionisti creano piani; i clienti li seguono quotidianamente. Il sistema aiuta a eseguire in modo costante. Tutto, dal design al copy al codice, deve rispettare questo principio.