interface ElementInf {
    element_id: number,
    name: string,
    description: string,
    status: string,
    img_url: string,
    period_time_text: string,
    period_time: number,
    atomic_mass: number
}

interface DecayInf {
    decay_elements_count: number,
    decay_id: number
}

interface ElementsResponse {
    elements: ElementInf[],
    decay_information: DecayInf
}

const mockElements: ElementsResponse = {
    elements: [
        {
            element_id: 1,
            name: "Сердечно-лёгочная реанимация (СЛР)",
            description: `Комплекс мероприятий по восстановлению кровообращения и дыхания у человека в состоянии клинической смерти. Включает ритмичные нажатия на грудную клетку и искусственное дыхание. Частота нажатий — 100–120 в минуту. Глубина компрессии — 5–6 см для взрослых. Применяется при остановке сердца, например, вследствие электротравмы, утопления или инфаркта.`,
            status: "active",
            img_url: "/mockImages/1.jpg",
            period_time_text: "Период полураспада: 4,2⋅10<sup>6</sup> лет",
            period_time: 132451200000000,
            atomic_mass: 98
        },
        {
            element_id: 3,
            name: "Остановка артериального кровотечения",
            description: `Наложение жгута выше раны при сильном кровотечении. Жгут накладывается на ткань, чтобы избежать повреждения кожи. Время наложения — не более 1 часа. Обязательна фиксация времени. Альтернатива — давящая повязка с использованием бинтов и марли. Используется при травмах крупных артерий (бедренной, плечевой).`,
            status: "active",
            img_url: "/mockImages/2.png",
            period_time_text: "Период полураспада: 4,9 минуты",
            period_time: 294,
            atomic_mass: 221
        },
        {
            element_id: 4,
            name: "Иммобилизация при переломе конечности",
            description: `Фиксация сломанной конечности шиной (может использоваться подручный материал: доски, палки). Шина должна захватывать два соседних сустава. При открытом переломе — предварительная обработка раны. Цель — предотвратить смещение костных отломков и снизить болевой синдром.`,
            status: "active",
            img_url: "/mockImages/3.jpg",
            period_time_text: "Период полураспада: 22 минуты",
            period_time: 1320,
            atomic_mass: 223
        },
        {
            element_id: 5,
            name: "Извлечение инородного тела из дыхательных путей",
            description: `Приём Геймлиха: резкие толчки в эпигастральную область пострадавшего. Для детей — удар по спине. Применяется при полной обструкции дыхательных путей (человек не может говорить, кашлять, синеет).`,
            status: "active",
            img_url: "/mockImages/4.jpg",
            period_time_text: "Период полураспада: 8,14 часов",
            period_time: 29304,
            atomic_mass: 210
        },
        {
            element_id: 8,
            name: "Обработка ожоговой поверхности",
            description: `Охлаждение ожога проточной водой (15–20 минут). Наложение стерильной нетканой повязки. Запрещено использовать масла, лёд или вскрывать пузыри. Применяется при термических ожогах II–III степени.`,
            status: "active",
            img_url: "/mockImages/5.jpg",
            period_time_text: "Период полураспада: 87,74 лет",
            period_time: 2766968640,
            atomic_mass: 238
        },
    ],
    decay_information: {
        decay_elements_count: 0,
        decay_id: 0
    }
} 
export default mockElements