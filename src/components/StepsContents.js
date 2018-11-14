import React from 'react'

import SelectedCharacter from './graphics/StepSeven/SelectedCharacter'
import DifferenceValue from './graphics/StepSeven/DifferenceValue'
import ResultingCharacter from './graphics/StepTwelve/ResultingCharacter'
import PythagorasFormula from './PythagorasFormula'
import StepP from '../containers/StepParagraph'
import HighlightElement from '../containers/HighlightElement'


const steps = [
    <>
      <p>
        Ось теорема Піфагора
      </p>
      <blockquote>
        {'Сума '}
        <HighlightElement highlightId='highlight-square' step={0}>
          <span>квадратів</span>
        </HighlightElement>
        {' '}
        <HighlightElement highlightId='highlight-cathetus' step={0}>
          <span>катетів</span>
        </HighlightElement>
        {' '}
        <HighlightElement highlightId="highlight-right-triangle" step={0}>
          <span>прямокутного трикутника</span>
        </HighlightElement>
        {' рівна квадрату '}
        <HighlightElement highlightId='highlight-hypothenuse' step={0}>
          <span>гіпотенузи</span>
        </HighlightElement>
        .
      </blockquote>
      <PythagorasFormula />
      <p>
        Для початку впевнимося, що ти добре розумієш всі слова
        у цьому реченні. Наводь мишкою на підкреслені терміни, щоби побачити визначення
        зліва.
      </p>
    </>,
    <p>
        Піфагор і вчитель/ка математики кажуть, що це правило працює для будь-якого
        прямокутного трикутника. Так ніби вони всіх їх перевірили!
        Їх же БУКВАЛЬНО безліч і достатньо лише одного-єдиного, квадрат гіпотенузи якого
        не рівний сумі квадратів катетів, щоби назавжди спростувати цю, можливо,
        найвідомішу в світі теорему. Це було би величезне відкриття — гріх не спробувати.
        <br/>
        Міняй трикутник ABC, совгаючи точками A і C, і спостерігай,
        як міняється співвідношення між квадратам сторін.
    </p>,
    <p>
        Спростувати теорему не вдалося, спробуємо її застосувати до чогось практичного.
        Треба лише знайти щось схоже на прямокутний трикутник у справжній серйозній життєвій задачі.
        Наприклад, у тесті <em>«Хто ти із персонажів Гаррі Поттера?»</em>.
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
        Хаос — Закон, Добро — Зло. Тут добрі — згори, злі — внизу, чемні — зліва, бунтівники — справа.
        Ти попадаєш до ( світогляд ).
    </p>,
    <p>
        Додамо інших персонажів на координатну площину. Далі потрібно буде виміряти відстань
        кожного з них до тебе, вибрати найближчого/у — це і буде твоїм результатом.
        Ти, певне, можеш і на око оцінити, який персонаж найближчий, але автоматичному тесту
        знадобиться чітка формула, у яку можна буде підставити твої значення і значення персонажа
        і отримати відстань між вами.
    </p>,
    <>
        <StepP>
          Порівняємо тебе з <SelectedCharacter grCase='INS'/> — оцінимо, наскільки
          відрізняється ваша слухняність і доброта.
        </StepP>
        <p>Введи потрібні формули (треба подумати над підказками).</p>
        <p>треба прокоментувати від'ємні значення різниці</p>

        <StepP>Ти на <DifferenceValue show="goodness"/> добріша/ий, ніж <SelectedCharacter /></StepP>
        <StepP>Ти на <DifferenceValue show="lawfullness"/> законослухняніша/ий ніж <SelectedCharacter /></StepP>
    </>,
    <p>
        Тепер треба скомбінувати ці значення в одне число, яке означатиме наскільки
        ви відрізняєтеся загалом. Це і буде відстань між вами. І в цьому місці
        уважно дивимося на зображення ще раз і бачимо там… прямокутний трикутник! Я ж обіцяла.
        Ти вже знаєш катети трикутника, а треба знайти гіпотенузу. А для цього використаємо те,
        заради чого ми всі тут зібралися, — теорему Піфагора!
        Введи потрібну формулу (треба продумати над підказками).
    </p>,
    <p>
        За цією ж формулою можна порахувати відстань до всіх інших персонажів.
        Міняй персонажів, кілкаючи на їхніх фотографіях на графіку.
    </p>,
    <>
      <p>
        Формула, яку ти склав/ла, має кілька зручних властивостей — тобі не треба переживати
        через від'ємні значення і нулі.
      </p>
      <p>
        Уяви собі, що тест проходить професор Снейп. Йому хочеться знати, наскільки
        він далекий від Герміони. Різниця у їхній доброті становить (0 - 10) = -10, так само і
        різниця у законослухняності: (0 - 10) = -10. Зрозуміло, що довжина відрізка
        від'ємною не буває, тому, по-чесному, ми могли би взяти модуль від цих чисел перед тим,
        як підставляти їх у кінцеву формулу. Але немає потреби морочитися з модулями, бо
        значення різниці у твоїй формулі підносяться до квадрату, а квадрат навіть від'ємного
        числа — додатний. В реузльтаті отриуємо цілком правильне значення відстані — 14,14.
      </p>
      <p>
        Відстань між Снейпом і Белатрисою така ж сама — 14.14, хоча ця пані відрізняється від
        професора зовсім в іншу сторону, ніж Герміона. (тут треба написати щось глибоке)
      </p>
    </>,
    <>
      <p>
        Якщо порівнювати Снейпа із Гарі, можна побачити ще одну особливість формули.
        Ці персонажі мають однакову законослухняність. Тому «трикутник» між ними виходить
        з однією нульовою стороною — це просто відрізок, а не трикутник. І в цьому спеціальному
        випадку, твоя формула також чудово працює:<br/>
        √<span style={{"textDecoration": "overline"}}>-10<sup>2</sup> + 0<sup>2</sup></span> = 10.
        <br/>
        Відстань між ними рівна різниці у хаотичності (але без мінуса).
      </p>
      <p>
        Серед наявних персонажів є ще один, який зовсім від Снейпа не відрізняється,
        відстань між ними — 0. Тому результатом тесту
        <em> «Хто ти із персонажів Гаррі Поттера?» </em> для нього буде — професор Снейп.
      </p>
    </>,
    <>
      <StepP>
        Тепер подивимося на твій результат: ти <ResultingCharacter />
      </StepP>
      <p>
        Також ти дізнався/лася, що теорему Піфагора використовують для
        вимірювання відстані між точками на площині.
        Хоча Піфагор і його учні, можливо, й не передбачили саме такого її використання
        (бо вони всі точно знали, що Піфагор — однозначно Ґілдерой Локгарт).
        Насправді у теореми Піфагора ще багато застосувань, і частина з них значно корисніші,
        ніж цей дурненький тест. Але навіть не зважаючи на те, що прямо зараз ? комп’ютерів
        обраховують що-небудь на основі теореми Піфагора, всі можливі прямокутні трикутники
        люди ще не перебробували, і ніколи не перепробують. На щастя, у нас є 367 доведень,
        які працюють для будь-якого з них.
      </p>
    </>
]

export default steps