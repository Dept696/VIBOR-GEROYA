const heroes = [
    "Abaddon", "Alchemist", "Ancient Apparition", "Anti-Mage", "Arc Warden",
    "Axe", "Bane", "Batrider", "Beastmaster", "Bloodseeker", "Bounty Hunter",
    "Brewmaster", "Bristleback", "Broodmother", "Centaur Warrunner", "Chaos Knight",
    "Chen", "Clinkz", "Clockwerk", "Crystal Maiden", "Dark Seer", "Dark Willow",
    "Dawnbreaker", "Dazzle", "Death Prophet", "Disruptor", "Doom", "Dragon Knight",
    "Drow Ranger", "Earth Spirit", "Earthshaker", "Elder Titan", "Ember Spirit",
    "Enchantress", "Enigma", "Faceless Void", "Grimstroke", "Gyrocopter", "Hoodwink",
    "Huskar", "Invoker", "Io", "Jakiro", "Juggernaut", "Keeper of the Light",
    "Kunkka", "Legion Commander", "Leshrac", "Lich", "Lifestealer", "Lina",
    "Lion", "Lone Druid", "Luna", "Lycan", "Magnus", "Mars", "Medusa", "Meepo",
    "Mirana", "Monkey King", "Morphling", "Muerta", "Naga Siren", "Nature's Prophet",
    "Necrophos", "Night Stalker", "Nyx Assassin", "Ogre Magi", "Omniknight",
    "Oracle", "Outworld Destroyer", "Pangolier", "Phantom Assassin", "Phantom Lancer",
    "Phoenix", "Primal Beast", "Puck", "Pudge", "Pugna", "Queen of Pain",
    "Razor", "Riki", "Rubick", "Sand King", "Shadow Demon", "Shadow Fiend",
    "Shadow Shaman", "Silencer", "Skywrath Mage", "Slardar", "Slark", "Snapfire",
    "Sniper", "Spectre", "Spirit Breaker", "Storm Spirit", "Sven", "Techies",
    "Templar Assassin", "Terrorblade", "Tidehunter", "Timbersaw", "Tinker",
    "Tiny", "Treant Protector", "Troll Warlord", "Tusk", "Underlord", "Undying",
    "Ursa", "Vengeful Spirit", "Venomancer", "Viper", "Visage", "Void Spirit",
    "Warlock", "Weaver", "Windranger", "Winter Wyvern", "Witch Doctor", "Wraith King",
    "Zeus"
];

const builds = [
    "Поздний керри", "Агрессивный ранний керри",
    "Универсальная поддержка", "Тяжелая поддержка",
    "Взрывной мидер", "Роуминговый мидер",
    "Танковый оффлейнер", "Сплит-пуш оффлейнер",
    "Фарм в лесу", "Ганкер из леса",
    "Инициатор командных боев", "Захватывающий инициатор",
    "Контроль толпы", "Комбо с оглушением",
    "Сетевой пуш", "Очистка волн",
    "Защита базы", "Защитная аура",
    "Полу-керри", "Универсальная поддержка"
];

// Получаем элементы DOM
const spinHeroButton = document.getElementById('spinHeroButton');
const spinBuildButton = document.getElementById('spinBuildButton');
const clickSound = document.getElementById('clickSound');

function createWheel(containerId, items) {
    const wheelContainer = document.getElementById(containerId);
    wheelContainer.innerHTML = '';

    const wheel = document.createElement('div');
    wheel.className = 'wheel';

    // Создаем конический градиент
    const gradient = items.map((_, index) => {
        const start = (index / items.length) * 100;
        const end = ((index + 1) / items.length) * 100;
        return `hsl(${(index / items.length) * 360}, 100%, 50%) ${start}% ${end}%`;
    }).join(',');

    wheel.style.background = `conic-gradient(${gradient})`;

    wheelContainer.appendChild(wheel);
}

function spinWheel(wheelSelector, items, resultElementId) {
    const wheel = document.querySelector(wheelSelector);
    const spins = Math.floor(Math.random() * 10) + 5; // Минимум 5 полных оборотов
    const extraDegrees = Math.floor(Math.random() * 360); // Случайный угол поворота
    const totalRotation = spins * 360 + extraDegrees;

    // Вращаем колесо
    wheel.style.transition = 'transform 5s ease-out'; // Плавная анимация (5 секунд)
    wheel.style.transform = `rotate(${totalRotation}deg)`;

    setTimeout(() => {
        wheel.style.transition = 'none'; // Убираем анимацию после завершения
        wheel.style.transform = `rotate(${extraDegrees}deg)`; // Возвращаем колесо в нужную позицию

        // Определяем выбранный элемент
        const selectedIndex = Math.floor(extraDegrees / (360 / items.length)) % items.length;
        document.getElementById(resultElementId).textContent = items[selectedIndex];

        // Проигрываем звук щелчка
        clickSound.play();
    }, 5000); // Ждём окончания анимации (5 секунд)
}

// Логика для кнопок
spinHeroButton.addEventListener('click', () => {
    spinWheel('#heroWheelContainer .wheel', heroes, 'selectedHero');
});

spinBuildButton.addEventListener('click', () => {
    spinWheel('#buildWheelContainer .wheel', builds, 'selectedBuild');
});

// Создаем колеса при загрузке страницы
createWheel('heroWheelContainer', heroes);
createWheel('buildWheelContainer', builds);