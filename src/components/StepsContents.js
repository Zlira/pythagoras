import React from 'react'


const steps = [
    // todo maybe each step should be able to have more than one paragraph
    <p>
        Ось теорема Піфагора ще раз: «Сума квадратів катетів прямокутного трикутника рівна 
        квадрату гіпотенузи». Для початку впевнимося, що ти добре розумієш всі слова 
        у цьому реченні. Наводь мишкою на кожен із термінів, щоби побачити визначення: 
        прямокутний трикутник, катет, гіпотенуза, квадрат числа.
    </p>,
    <p>
        Піфагор і вчитель/ка математики кажуть, що це правило працює для будь-якого 
        прямокутного трикутника. Так ніби вони всіх їх перевірили! 
        Їх же БУКВАЛЬНО безліч і достатньо лише одного-єдиного, квадрат гіпотенузи якого
        не рівний сумі квадратів катетів, щоби назавжди спростувати цю, можливо, 
        найвідомішу теорему в світі. Це було би величезне відкриття — гріх не спробувати. 
        <br/>        
        Міняй трикутник ABC, совгаючи точками B       і C     і спостерігай, 
        як міняється співвідношення між квадратам сторін.
    </p>,
    <p>
        Спростувати теорему не вдалося, спробуємо її застосувати до чогось практичного. 
        Треба лише знайти щось схоже на прямокутний трикутник у справжній серйозній життєвій задачі. 
        Наприклад, у тесті «Хто ти із персонажів Гаррі Поттера?». 
        І ні, прямокутний трикутник — це не один з персонажів.
        Ми побачимо, до чого тут трикутник трохи пізніше, але почнемо із самого тесту. 
        У ньому всього два питання.
    </p>,
    <ol>
        <li>Розмісти себе на шкалі Хаос (-10) — Закон (+10), де Хаос — це свобода і гнучкість, 
            а Закон — честь і відданість правилам.</li>
        <li>Розмісти себе на шкалі Зло (-10) — Добро (+10), де Зло — це шкодити іншим, 
            а Добро — допомагати</li>
    </ol>,
    <p>
        Тепер ми маємо твої показники і можемо помістити тебе у спеціальну систему координат з осями 
        Хаос — Закон, Добро — Зло. Тут добрі —згори, злі — внизу, чемні — зліва, бунтівники — справа. 
        Ти попадаєш до (  світогляд ).
    </p>,
    <p>
        Додамо інших персонажів на координатну площину. Далі потрібно буде виміряти відстань 
        кожного з них до тебе, вибрати найближчого/у — це і буде твоїм результатом. 
        Ти, певне, можеш і на око оцінити, який персонаж найближчий, але автоматичному тесту 
        знадобиться чітка формула, у яку можна буде підставити твої значення і значення персонажа 
        і отримати відстань між вами.
    </p>,
    <p>
        Вибери одного персонажа, клікнувши на ньому. Ти можеш легко порівняти вашу злостивість і хаотичність.
        Введи потрібну формулу (треба подумати над підказками).

        Ти на (  ) добріша/ий, ніж (  )
        Ти на (  ) хаотичніша/ий ніж (  )
        <br/>
        Спеціальний випадок: коли одна з координат не відрізняється!!!
    </p>,
    <p>
        Тепер треба скомбінувати ці значення в одне число, яке означатиме наскільки
        ви відрізняєтеся загалом. Це і буде відстань між вами. І в цьому місці 
        уважно дивимося на зображення ще раз і бачимо там… прямокутний трикутник! Я ж обіцяла. 
        Ти вже знаєш катети трикутника, а треба знайти гіпотенузу. А для цього треба використати те, 
        заради чого ми всі тут зібралися, — теорему Піфагора!
        Введи потрібну формулу (треба продумати над підказками).
    </p>,
    <p>
        За цією ж формулою можна порахувати відстань до всіх інших персонажів. 
        Міняй персонажів, кілкаючи на їхніх фотографіях на графіку.
    </p>,
    <p>
        Зверни увагу, формула, яку ти склав/ла, має кілька приємних властивостей.
        По-перше, може бути таке, що у вас з якимось персонажем цілком співпадає доброта. 
        Тоді ніякого прямокутного трикутника не вийде, бо одна з його сторін мала би довжину 0.
        Але формула все одно працює — відстань між вами рівна різниці в хаотичності. 
        Якщо ви ще й однаково хаотичні — відстань виходить 0, і це цілком правильно!
    </p>,
    <p>
        По-друге, може бути таке, що двоє персонажів від тебе рівновіддалені, але один зліший, 
        інший — добріший. Тому різниця у вашій доброті буде однакова по значенню, 
        але різна по знаку — 5 і -5. Але у твоїй формулі це не має значення (вибач за каламбур), 
        бо різниці підносяться до квадрату і відстань завжди виходить додатною.
    </p>,
    <p>
        Ну ось, тепер ми знаємо, що, по-перше, ти (  ), по-друге, 
        теорему Піфагора використовують для вимірювання відстані між точками на площині. 
        Хоча Піфагор і його учні, можливо, й не передбачили саме такого її використання 
        (бо вони всі точно знали, що Піфагор — однозначно Ґілдерой Локгарт). 
        Насправді у теореми Піфагора ще багато застосувань, і частина з них значно корисніші, 
        ніж цей дурненький тест. Але навіть не зважаючи на те, що прямо зараз ? комп’ютерів 
        обраховують що-небудь на основі теореми Піфагора, всі можливі прямокутні трикутники 
        люди ще не перебробували, і ніколи не перепробують. На щастя, у нас є 367 доведень, 
        які працюють для будь-якого з них.
    </p>
]

export default steps