export const NORMAL_USER_TYPE = 0
export const ADMIN_USER_TYPE = 1

export const priorities = [
    {
        level: 10,
        color: "#FF0000",
        description: "Situações extremamente perigosas ou críticas.",
        example: "Rua completamente alagada, bloqueando acesso a residências.",
    },
    {
        level: 9,
        color: "#FF3300",
        description: "Situações muito graves, próximas de urgência máxima.",
        example: "Cabo elétrico rompido solto no meio da estrada.",
    },
    {
        level: 8,
        color: "#FF6600",
        description: "Problemas graves que precisam de atenção rápida.",
        example: "Buraco grande na via principal, risco de acidentes.",
    },
    {
        level: 7,
        color: "#FF9900",
        description: "Problemas consideráveis, mas sem risco imediato grave.",
        example: "Poste de luz piscando próximo de uma área movimentada.",
    },
    {
        level: 6,
        color: "#FFCC00",
        description: "Moderadamente importante, exige atenção em breve.",
        example: "Sinais de trânsito apagados em cruzamentos menos movimentados.",
    },
    {
        level: 5,
        color: "#FFD700",
        description: "Questões importantes, mas sem risco imediato.",
        example: "Semáforo intermitente em um cruzamento.",
    },
    {
        level: 4,
        color: "#CCE700",
        description: "Problemas menores, mas que podem causar desconforto.",
        example: "Calçada quebrada em frente a uma escola.",
    },
    {
        level: 3,
        color: "#99FF33",
        description: "Problemas pouco significativos, mas visíveis.",
        example: "Lâmpada queimada em uma praça pública.",
    },
    {
        level: 2,
        color: "#66FF66",
        description: "Problemas menores que afetam pouquíssimas pessoas.",
        example: "Rachadura superficial em um banco público.",
    },
    {
        level: 1,
        color: "#33FF99",
        description: "Problemas de baixa relevância ou somente estéticos.",
        example: "Pequenas manchas de ferrugem em uma grade.",
    },
    {
        level: 0,
        color: "#00FFFF",
        description: "Questões insignificantes ou meramente informativas.",
        example: "Grafite em uma parede pública sem impacto no ambiente.",
    },
];

export const PrioritiesColors = [
    "hsl(207, 89.00%, 35.70%)",  // #0A62AC
    "hsl(150, 100%, 45%)",  // #33FF99
    "hsl(120, 100%, 45%)",  // #66FF66
    "hsl(75, 100%, 45%)",   // #99FF33
    "hsl(60, 100%, 45%)",   // #CCE700
    "hsl(51, 100%, 45%)",   // #FFD700
    "hsl(45, 100%, 45%)",   // #FFCC00
    "hsl(30, 100%, 45%)",   // #FF9900
    "hsl(15, 100%, 45%)",   // #FF6600
    "hsl(0, 100%, 45%)",    // #FF3300
    "hsl(0, 100%, 45%)",    // #FF0000
];
