// Массивы героев и дорогих предметов
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

const expensiveItems = [
    "Aghanim's Scepter", "Butterfly", "Heart of Tarrasque", "Hand of Midas",
    "Power Treads", "Linken's Sphere", "Manta Style", "Octarine Core",
    "Refresher Orb", "Gleipnir", "Moon Shard", "Helm of the Overlord", 
    "Pipe of Insight", "Spirit Vessel", "Boots of Bearing", "Guardian Greaves",
    "Parasma", "Scythe of Vyse", "Wind Waker", "Aeon Disk", "Crimson Guard",
    "Eternal Shroud", "Lotus Orb", "Black King Bar", "Bloodstone", "Hurricane Pike",
    "Assault Cuirass", "Shiva's Guard", "Heart of Tarrasque", "Armlet of Mordiggian",
    "Meteor Hammer", "Desolator", "Battle Fury", "Nullifier", "Monkey King Bar", 
    "Radiance", "Revenant's Brooch", "Daedalus", "Ethereal Blade", "Silver Edge",
    "Divine Rapier", "Disperser", "Abyssal Blade", "Bloodthorn", 
    "Sange and Yasha", "Kaya and Sange", "Yasha and Kaya", "Eye of Skadi", "Harpoon",
    "Satanic", "Mjollnir", "Arcane Blink", "Overwhelming Blink", "Swift Blink",
    "Block of Cheese", "Mage Slayer",
];

// Массивы для отслеживания использованных героев и дорогих предметов
let usedHeroes = [];
let usedExpensiveItems = [];

// Получаем элементы DOM
const spinHeroButton = document.getElementById('spinHeroButton');
const clickSound = document.getElementById('clickSound');

// Функция для создания колеса с иконками
function createWheel(containerId, items, iconContainerClass) {
    const wheelContainer = document.getElementById(containerId);
    wheelContainer.innerHTML = '';

    // Создаем контейнер для иконок
    const wheelIcons = document.createElement('div');
    wheelIcons.className = 'wheel-icons';

    // Добавляем иконки героев или дорогих предметов
    items.forEach(item => {
        const icon = document.createElement('img');
        icon.src = `images/items/${item}.png`; // Путь к иконке
        icon.alt = item;
        icon.style.display = 'none'; // Скрываем все иконки
        wheelIcons.appendChild(icon);
    });

    wheelContainer.appendChild(wheelIcons);

    // Создаем колесо
    const wheel = document.createElement('div');
    wheel.className = 'wheel';
    wheel.style.background = 'transparent'; // Убираем градиент
    wheelContainer.appendChild(wheel);
}

// Функция для получения случайного элемента (с учетом использованных)
function getRandomItem(items, usedItems) {
    // Фильтруем доступные элементы (исключаем использованные)
    const availableItems = items.filter(item => !usedItems.includes(item));

    if (availableItems.length === 0) {
        // Если все элементы использованы, очищаем массив использованных
        usedItems.length = 0;
        return getRandomItem(items, usedItems); // Рекурсивно выбираем новый элемент
    }

    // Выбираем случайный элемент из доступных
    const randomIndex = Math.floor(Math.random() * availableItems.length);
    return availableItems[randomIndex];
}

// Функция для анимации колеса
function spinWheel(wheelSelector, items, resultElementId, iconContainerClass, usedItems) {
    const wheel = document.querySelector(wheelSelector);
    const wheelIcons = document.querySelector(`.${iconContainerClass}`);
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
        const selectedItem = getRandomItem(items, usedItems);
        usedItems.push(selectedItem); // Добавляем элемент в массив использованных
        document.getElementById(resultElementId).textContent = selectedItem;

        // Отображаем выбранную иконку
        const icons = Array.from(document.querySelectorAll(`.${iconContainerClass} img`));
        icons.forEach(icon => icon.style.display = 'none'); // Скрываем все иконки
        const selectedIcon = icons.find(icon => icon.alt === selectedItem);
        if (selectedIcon) {
            selectedIcon.style.display = 'block'; // Показываем выбранную иконку
        }

        // Проигрываем звук щелчка
        clickSound.play();
    }, 5000); // Ждём окончания анимации (5 секунд)
}

// Логика для кнопки вращения колеса героев
spinHeroButton.addEventListener('click', () => {
    const wheel = document.querySelector('#heroWheelContainer .wheel');
    wheel.style.background = 'conic-gradient(#ff9a9e 0% 10%, #fad0c4 10% 20%, #fbc2eb 20% 30%, #c6e4ff 30% 40%, #dcedc1 40% 50%, #fff7cc 50% 60%, #ffd8b1 60% 70%, #a8e6cf 70% 80%, #c8c8a9 80% 90%, #ffcfd2 90% 100%)';

    spinWheel('#heroWheelContainer .wheel', heroes, 'selectedHero', 'wheel-icons', usedHeroes);

    setTimeout(() => {
        wheel.style.background = 'transparent'; // Убираем градиент после завершения анимации
    }, 5000);
});

// Логика для маленьких колес с предметами
function spinItemWheel(index) {
    const wheelSelector = `#itemWheel${index}`;
    const resultElementId = `item${index}`;
    const iconContainerClass = `item-wheel-icons-${index}`;

    // Создаем колесо, если оно еще не создано
    if (!document.querySelector(`.${iconContainerClass}`)) {
        createWheel(wheelSelector.replace('#', ''), expensiveItems, iconContainerClass);
    }

    spinWheel(wheelSelector, expensiveItems, resultElementId, iconContainerClass, usedExpensiveItems);
}

// Инициализация колес при загрузке страницы
createWheel('heroWheelContainer', heroes, 'wheel-icons');