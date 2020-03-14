import { LearningGraph, Node, ResourceType } from './types';

const ROW_LENGTH = 200;
const SPLIT_LENGTH = 100;

const nodes: Record<string, Node> = {
  arithmetic: {
    id: 'arithmetic',
    name: 'Tall og regning',
    resources: [],
    position: {
      x: 0,
      y: 0,
    },
  },
  percent: {
    id: 'percent',
    name: 'Prosent',
    resources: [],
    position: {
      x: ROW_LENGTH,
      y: SPLIT_LENGTH,
    },
  },
  probability: {
    id: 'probability',
    name: 'Sannsynlighet',
    resources: [
      {
        type: ResourceType.VIDEO,
        title: 'Learn math',
        url: 'dwedw',
      },
    ],
    position: {
      x: ROW_LENGTH * 2,
      y: SPLIT_LENGTH,
    },
  },
  fractions: {
    id: 'fractions',
    name: 'Brøk',
    resources: [],
    position: {
      x: ROW_LENGTH,
      y: -SPLIT_LENGTH,
    },
  },
  exp: {
    id: 'exp',
    name: 'Potenser',
    resources: [],
    position: {
      x: ROW_LENGTH * 2,
      y: -SPLIT_LENGTH,
    },
  },
  algebra: {
    id: 'algebra',
    name: 'Algebra',
    resources: [],
    position: {
      x: ROW_LENGTH * 3,
      y: -SPLIT_LENGTH * 2,
    },
  },
  stats: {
    id: 'stats',
    name: 'Statistikk',
    resources: [],
    position: {
      x: 620,
      y: 0,
    },
  },
};

export const CampusIncrementGraph: LearningGraph = {
  id: 'Qa6EI8VR6bQKehMtPlQb',
  name: 'Mathematics (8-10 grade), Campus Inkrement',
  nodes: Object.values(nodes),
  edges: [
    {
      id: '0',
      source: nodes.arithmetic,
      target: nodes.fractions,
    },
    {
      id: '1',
      source: nodes.arithmetic,
      target: nodes.percent,
    },
    {
      id: '2',
      source: nodes.fractions,
      target: nodes.exp,
    },
    {
      id: '3',
      source: nodes.exp,
      target: nodes.algebra,
    },
    {
      id: '4',
      source: nodes.exp,
      target: nodes.stats,
    },
    {
      id: '5',
      source: nodes.percent,
      target: nodes.probability,
    },
  ],
};

export const curriculum = {
  'MAT1-04-4': {
    ID: 'MAT1-04-4',
    title: 'Matematikk 8. - 10. trinn',
    hours: 18780,
    chapters: [
      {
        title: 'Tall og algebra',
        goals: [
          'Samanlikne og rekne om mellom heile tal, desimaltal, brøkar, prosent, promille og tal på standardform, uttrykkje slike tal på varierte måtar og vurdere i kva for situasjonar ulike representasjonar er formålstenlege',
          'Rekne med brøk, utføre divisjon av brøkar og forenkle brøkuttrykk',
          'Bruke faktorar, potensar, kvadratrøter og primtal i berekningar',
          'Utvikle, bruke og gjere greie for ulike metodar i hovudrekning, overslagsrekning og skriftleg rekning med dei fire rekneartane',
          'Behandle, faktorisere og forenkle algebrauttrykk, knyte uttrykka til praktiske situasjonar, rekne med formlar, parentesar og brøkuttrykk og bruke kvadratsetningane',
          'Løyse likningar og ulikskapar av første grad og likningssystem med to ukjende og bruke dette til å løyse praktiske og teoretiske problem',
          'Gjere berekningar om forbruk, bruk av kredittkort, inntekt, lån og sparing, setje opp budsjett og rekneskap ved å bruke rekneark og gjere greie for berekningar og presentere resultata',
          'Analysere samansette problemstillingar, identifisere faste og variable storleikar, kople samansette problemstillingar til kjende løysingsmetodar, gjennomføre berekningar og presentere resultata på ein formålstenleg måte',
          'Bruke tal og variablar i utforsking, eksperimentering og praktisk og teoretisk problemløysing og i prosjekt med teknologi og design',
        ],
      },
      {
        title: 'Geometri',
        goals: [
          'Undersøkje og beskrive eigenskapar ved to- og tredimensjonale figurar og bruke eigenskapane i samband med konstruksjonar og berekningar',
          'Utføre, beskrive og grunngje geometriske konstruksjonar med passar og linjal og dynamisk geometriprogram',
          'Bruke og grunngje bruken av formlikskap og Pytagoras’ setning i berekning av ukjende storleikar',
          'Tolke og lage arbeidsteikningar og perspektivteikningar med fleire forsvinningspunkt, med og utan digitale verktøy',
          'Bruke koordinatar til å avbilde figurar og utforske eigenskapar ved geometriske former, med og utan digitale verktøy',
          'Utforske, eksperimentere med og formulere logiske resonnement ved hjelp av geometriske idear og gjere greie for geometriske forhold som har særleg mykje å seie i teknologi, kunst og arkitektur',
        ],
      },
      {
        title: 'Måling',
        goals: [
          'Gjere overslag over og berekne lengd, omkrins, vinkel, areal, overflate, volum, tid, fart og massetettleik og bruke og endre målestokk',
          'Velje høvelege måleiningar, forklare samanhengar og rekne om mellom ulike måleiningar, bruke og vurdere måleinstrument og målemetodar i praktisk måling og drøfte presisjon og måleusikkerheit',
          'Gjere greie for talet π og bruke det i berekningar av omkrins, areal og volum',
        ],
      },
      {
        title: 'Statistikk, sannsynlighet og kombinatorikk',
        goals: [
          'Gjennomføre undersøkingar og bruke databasar til å søkje etter og analysere statistiske data og vise kjeldekritikk',
          'Ordne og gruppere data, finne og drøfte median, typetal, gjennomsnitt og variasjonsbreidd, presentere data, med og utan digitale verktøy, og drøfte ulike dataframstillingar og kva inntrykk dei kan gje',
          'Finne og diskutere sannsyn gjennom eksperimentering, simulering og berekning i daglegdagse samanhengar og spel',
          'Beskrive utfallsrom og uttrykkje sannsyn som brøk, prosent og desimaltal',
          'Drøfte og løyse enkle kombinatoriske problem',
        ],
      },
      {
        title: 'Funksjoner',
        goals: [
          'Lage funksjonar som beskriv numeriske samanhengar og praktiske situasjonar, med og utan digitale verktøy, beskrive og tolke dei og omsetje mellom ulike representasjonar av funksjonar, som grafar, tabellar, formlar og tekstar',
          'Identifisere og utnytte eigenskapane til proporsjonale, omvendt proporsjonale, lineære og kvadratiske funksjonar og gje døme på praktiske situasjonar som kan beskrivast med desse funksjonane',
        ],
      },
    ],
    purpose: [
      'Matematikk er ein del av den globale kulturarven vår. Mennesket har til alle tider brukt og utvikla matematikk for å systematisere erfaringar, for å beskrive og forstå samanhengar i naturen og i samfunnet og for å utforske universet. Ei anna inspirasjonskjelde til utviklinga av faget har vore glede hos menneske over arbeid med matematikk i seg sjølv. Faget grip inn i mange vitale samfunnsområde, som medisin, økonomi, teknologi, kommunikasjon, energiforvalting og byggjeverksemd. Solid kompetanse i matematikk er dermed ein føresetnad for utvikling av samfunnet. Eit aktivt demokrati treng borgarar som kan setje seg inn i, forstå og kritisk vurdere kvantitativ informasjon, statistiske analysar og økonomiske prognosar. På den måten er matematisk kompetanse nødvendig for å forstå og kunne påverke prosessar i samfunnet.',
      'Matematisk kompetanse inneber å bruke problemløysing og modellering til å analysere og omforme eit problem til matematisk form, løyse det og vurdere kor gyldig løysinga er. Dette har òg språklege aspekt, som det å formidle, samtale om og resonnere omkring idear. I det meste av matematisk aktivitet nyttar ein hjelpemiddel og teknologi. Både det å kunne bruke og vurdere ulike hjelpemiddel og det å kjenne til avgrensinga deira er viktige delar av faget. Kompetanse i matematikk er ein viktig reiskap for den einskilde, og faget kan leggje grunnlag for å ta vidare utdanning og for deltaking i yrkesliv og fritidsaktivitetar. Matematikk ligg til grunn for store delar av kulturhistoria vår og utviklinga av logisk tenking. På den måten spelar faget ei sentral rolle i den allmenne danninga ved å påverke identitet, tenkjemåte og sjølvforståing.',
      'Matematikkfaget i skolen medverkar til å utvikle den matematiske kompetansen som samfunnet og den einskilde treng. For å oppnå dette må elevane få høve til å arbeide både praktisk og teoretisk. Opplæringa vekslar mellom utforskande, leikande, kreative og problemløysande aktivitetar og ferdigheitstrening. I praktisk bruk viser matematikk sin nytte som reiskapsfag. I skolearbeidet utnyttar ein sentrale idear, former, strukturar og samanhengar i faget. Elevane må utfordrast til å kommunisere matematikk skriftleg, munnleg og digitalt. Det må leggjast til rette for at både jenter og gutar får rike erfaringar med matematikkfaget, som skaper positive haldningar og ein solid fagkompetanse. Slik blir det lagt eit grunnlag for livslang læring.',
    ],
    skills: [
      'Grunnleggjande ferdigheiter er integrerte i kompetansemåla, der dei medverkar til utvikling av og er ein del av fagkompetansen. I matematikk forstår ein grunnleggjande ferdigheiter slik:',
      'Munnlege ferdigheiter i matematikk inneber å skape meining gjennom å lytte, tale og samtale om matematikk. Det inneber å gjere seg opp ei meining, stille spørsmål og argumentere ved hjelp av både eit uformelt språk, presis fagterminologi og omgrepsbruk. Det vil seie å vere med i samtalar, kommunisere idear og drøfte matematiske problem, løysingar og strategiar med andre. Utvikling i munnlege ferdigheiter i matematikk går frå å delta i samtalar om matematikk til å presentere og drøfte komplekse faglege emne. Vidare går utviklinga frå å bruke eit enkelt matematisk språk til å bruke presis fagterminologi og uttrykksmåte og presise omgrep.',
      'Å kunne skrive i matematikk inneber å beskrive og forklare ein tankegang og setje ord på oppdagingar og idear. Det inneber å bruke matematiske symbol og det formelle matematiske språket til å løyse problem og presentere løysingar. Vidare vil det seie å lage teikningar, skisser, figurar, grafar, tabellar og diagram som er tilpassa mottakaren og situasjonen. Skriving i matematikk er ein reiskap for å utvikle eigne tankar og eiga læring. Utvikling i å skrive i matematikk går frå å bruke enkle uttrykksformer til gradvis å ta i bruk eit formelt symbolspråk og ein presis fagterminologi. Vidare går utviklinga frå å beskrive og systematisere enkle situasjonar med matematikkfagleg innhald til å byggje opp ein heilskapleg argumentasjon omkring komplekse samanhengar.',
      'Å kunne lese i matematikk inneber å forstå og bruke symbolspråk og uttrykksformer for å skape meining i tekstar frå daglegliv og yrkesliv så vel som matematikkfaglege tekstar. Matematikkfaget er prega av samansette tekstar som inneheld matematiske uttrykk, grafar, diagram, tabellar, symbol, formlar og logiske resonnement. Lesing i matematikk inneber å sortere informasjon, analysere og vurdere form og innhald og samanfatte informasjon frå ulike element i tekstar. Utvikling i å lese i matematikk går frå å finne og bruke informasjon i tekstar med enkelt symbolspråk til å finne meining og reflektere over komplekse fagtekstar med avansert symbolspråk og omgrepsbruk.',
      'Å kunne rekne i matematikk inneber å bruke symbolspråk, matematiske omgrep, framgangsmåtar og varierte strategiar til problemløysing og utforsking som tek utgangspunkt både i praktiske, daglegdagse situasjonar og i matematiske problem. Dette inneber å kjenne att og beskrive situasjonar der matematikk inngår, og bruke matematiske metodar til å behandle problemstillingar. Eleven må òg kommunisere og vurdere kor gyldige løysingane er. Utvikling av å rekne i matematikk går frå grunnleggjande talforståing og å kjenne att og løyse problem ut frå enkle situasjonar til å analysere og løyse eit spekter av komplekse problem med eit variert utval av strategiar og metodar. Vidare inneber dette i aukande grad å bruke ulike hjelpemiddel i berekningar, modellering og kommunikasjon.',
      'Digitale ferdigheiter i matematikk inneber å bruke digitale verktøy til læring gjennom spel, utforsking, visualisering og presentasjon. Det handlar òg om å kjenne til, bruke og vurdere digitale verktøy til berekningar, problemløysing, simulering og modellering. Vidare vil det seie å finne informasjon, analysere, behandle og presentere data med formålstenlege verktøy, og vere kritisk til kjelder, analysar og resultat. Utvikling i digitale ferdigheiter inneber å arbeide med samansette digitale tekstar med aukande grad av kompleksitet. Vidare inneber det å bli stadig meir merksam på den nytten digitale verktøy har for læring i matematikkfaget.',
    ],
    levels: [8, 9, 10],
  },
};
