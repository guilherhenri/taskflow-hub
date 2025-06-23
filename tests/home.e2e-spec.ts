import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173')
})

test.describe('Home Page - Initial Load', () => {
  test('display list of tasks', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Home' })).toBeVisible()
    await expect(page.getByRole('button', { name: /new/i })).toBeVisible()
    await expect(page.locator('div[aria-label="separator"]')).toBeVisible()
    await expect(page.locator('div[aria-label="list-tasks"]')).toBeVisible()
  })

  test('must display up to 10 tasks maximum', async ({ page }) => {
    const taskCards = page.locator('div[aria-label="task-card"]')
    const taskCount = await taskCards.count()

    expect(taskCount).toBeLessThanOrEqual(10)
  })
})

test.describe('Home Page - Task Creation', () => {
  test('should open the creation modal when clicking on the New button', async ({
    page,
  }) => {
    await page.getByRole('button', { name: /new/i }).click()

    await expect(page.getByRole('dialog')).toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'Create new task' }),
    ).toBeVisible()

    await expect(page.getByLabel('Title')).toBeVisible()
    await expect(page.getByPlaceholder('homework')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Save' })).toBeVisible()
  })

  test('should create a new task successfully', async ({ page }) => {
    const taskTitle = 'New Test Task'

    await page.getByRole('button', { name: /new/i }).click()

    await page.getByLabel('Title').fill(taskTitle)

    await expect(page.getByRole('button', { name: 'Save' })).toBeEnabled()

    await page.getByRole('button', { name: 'Save' }).click()

    await expect(page.getByRole('dialog')).not.toBeVisible()
  })

  test('should close the modal when clicking outside or on the X', async ({
    page,
  }) => {
    await page.getByRole('button', { name: /new/i }).click()
    await expect(page.getByRole('dialog')).toBeVisible()

    await page.locator('button[data-slot="dialog-close"]').first().click()
    await expect(page.getByRole('dialog')).not.toBeVisible()
  })

  test('must validate mandatory field in the form', async ({ page }) => {
    await page.getByRole('button', { name: /new/i }).click()

    const saveButton = page.getByRole('button', { name: 'Save' })

    await expect(saveButton).toBeDisabled()

    await page.getByLabel('Title').fill('Test')
    await expect(saveButton).toBeEnabled()

    await page.getByLabel('Title').clear()
    await expect(saveButton).toBeDisabled()
  })
})

test.describe('Home Page - Task Management', () => {
  test('must mark/unmark task as completed', async ({ page }) => {
    const taskCard = page.locator('div[aria-label="task-card"]').first()

    await expect(taskCard).not.toHaveClass(/border-primary/)

    await taskCard.click()

    await expect(taskCard).toHaveClass(/border-primary/)
    await expect(taskCard.locator(`p`)).toHaveClass(/line-through/)

    await taskCard.click()

    await expect(taskCard).not.toHaveClass(/border-primary/)
    await expect(taskCard.locator(`p`)).not.toHaveClass(/line-through/)
  })

  test('must edit an existing task', async ({ page }) => {
    const editedTitle = 'Task edit'

    const taskCard = page.locator('div[aria-label="task-card"]').first()
    const editButton = taskCard
      .getByRole('button')
      .filter({ has: page.locator('svg') })
      .first()
    const originalTitle = await taskCard.locator('p').textContent()

    expect(originalTitle).not.toBeNull()

    await editButton.click()

    await expect(page.getByRole('dialog')).toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'Update task' }),
    ).toBeVisible()

    await expect(page.getByLabel('Title')).toHaveValue(originalTitle!)

    await page.getByLabel('Title').clear()
    await page.getByLabel('Title').fill(editedTitle)

    await page.getByRole('button', { name: 'Save' }).click()

    await expect(page.getByRole('dialog')).not.toBeVisible()

    await expect(page.getByText(editedTitle)).toBeVisible()
    await expect(page.getByText(originalTitle!)).not.toBeVisible()
  })

  test('must remove a task', async ({ page }) => {
    const taskCard = page.locator('div[aria-label="task-card"]').first()
    const taskTitle = await taskCard.locator('p').textContent()

    expect(taskTitle).not.toBeNull()

    const deleteButton = taskCard
      .getByRole('button')
      .filter({ has: page.locator('svg') })
      .last()

    await deleteButton.click()

    await expect(page.getByText(taskTitle!)).not.toBeVisible()
  })

  test('should display hover effect on unfinished cards', async ({ page }) => {
    const taskCard = page.locator('div[aria-label="task-card"]').first()

    await taskCard.hover()
    await expect(taskCard).toHaveClass(/hover:bg-secondary/)
  })
})
