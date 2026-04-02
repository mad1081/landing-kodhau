import type { Problem } from './mockProblem'

export const STATIC_TASKS: Problem[] = [
  {
    id: 'two-sum-js',
    category: 'javascript',
    title: 'Два числа (Two Sum)',
    description: `Дан массив целых чисел \`nums\` и число \`target\`. Верните индексы двух чисел, сумма которых равна \`target\`.

Гарантируется, что ровно одно решение существует; один и тот же элемент нельзя использовать дважды.`,
    examples: [
      { input: 'nums = [2, 7, 11, 15], target = 9', output: '[0, 1]', explanation: 'nums[0] + nums[1] = 2 + 7 = 9' },
      { input: 'nums = [3, 2, 4], target = 6', output: '[1, 2]' },
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      'Существует ровно один допустимый ответ.',
    ],
    starterCode: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  // Ваш код здесь
  return [];
}
`,
    functionName: 'twoSum',
    testCases: [
      { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
      { input: [[3, 2, 4], 6], expected: [1, 2] },
      { input: [[3, 3], 6], expected: [0, 1] },
    ],
  },
  {
    id: 'valid-parentheses-js',
    category: 'javascript',
    title: 'Правильные скобки',
    description: `Дана строка \`s\`, содержащая только символы \`(\`, \`)\`, \`{\`, \`}\`, \`[\` и \`]\`. Определите, является ли строка валидной.

Строка валидна, если открывающие скобки закрываются скобками того же типа и в правильном порядке.`,
    examples: [
      { input: 's = "()"', output: 'true' },
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "(]"', output: 'false' },
    ],
    constraints: [
      '1 <= s.length <= 10^4',
      'Строка состоит только из скобок \'()[]{}\'.',
    ],
    starterCode: `/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
  // Ваш код здесь
  return false;
}
`,
    functionName: 'isValid',
    testCases: [
      { input: ['()'], expected: true },
      { input: ['()[]{}'], expected: true },
      { input: ['(]'], expected: false },
      { input: ['{[]}'], expected: true },
    ],
  },
  {
    id: 'max-subarray-js',
    category: 'javascript',
    title: 'Максимальная сумма подмассива',
    description: `Дан массив целых чисел \`nums\`. Найдите подмассив с максимальной суммой и верните эту сумму.`,
    examples: [
      { input: 'nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]', output: '6', explanation: 'Подмассив [4, -1, 2, 1] даёт максимальную сумму 6.' },
      { input: 'nums = [1]', output: '1' },
    ],
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^4 <= nums[i] <= 10^4',
    ],
    starterCode: `/**
 * @param {number[]} nums
 * @return {number}
 */
function maxSubArray(nums) {
  // Ваш код здесь
  return 0;
}
`,
    functionName: 'maxSubArray',
    testCases: [
      { input: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expected: 6 },
      { input: [[1]], expected: 1 },
      { input: [[5, 4, -1, 7, 8]], expected: 23 },
    ],
  },
  {
    id: 'top-n-per-group-sql',
    category: 'postgresql',
    title: 'Топ N в каждой группе',
    description: `Дана таблица продаж с полями \`id\`, \`product_id\`, \`amount\`, \`sale_date\`. Напишите запрос, возвращающий две крупнейшие по сумме продажи для каждого товара.`,
    examples: [
      { input: 'Таблица продаж: product_id, amount', output: 'Для каждого product_id: две строки с наибольшей суммой' },
    ],
    constraints: [
      'Есть столбцы product_id и amount.',
      'Сортировка по amount DESC в рамках каждого товара.',
    ],
    starterCode: `-- Топ 2 продажи по каждому товару (по сумме)
-- Ваш SQL здесь
`,
  },
  {
    id: 'second-highest-salary-sql',
    category: 'postgresql',
    title: 'Вторая по величине зарплата',
    description: `Напишите SQL-запрос, возвращающий вторую по величине зарплату из таблицы \`Employee\`. Если такой нет — верните null.`,
    examples: [
      { input: 'Таблица Employee: id, salary', output: 'Одно значение: вторая зарплата или null' },
    ],
    constraints: [
      'В таблице есть как минимум \`id\` и \`salary\`.',
    ],
    starterCode: `-- Вторая по величине зарплата
-- Ваш SQL здесь
`,
  },
  {
    id: 'department-highest-salary-sql',
    category: 'postgresql',
    title: 'Максимальная зарплата по отделу',
    description: `Даны таблицы \`Employee\` (id, name, salary, departmentId) и \`Department\` (id, name). Найдите сотрудников с максимальной зарплатой в каждом отделе.`,
    examples: [
      { input: 'Таблицы Employee и Department', output: 'Название отдела, имя сотрудника, зарплата' },
    ],
    constraints: [
      'Верните название отдела, имя сотрудника и зарплату.',
    ],
    starterCode: `-- Максимальная зарплата по отделу
-- Ваш SQL здесь
`,
  },
]
