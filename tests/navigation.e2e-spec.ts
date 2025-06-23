import { expect, test } from '@playwright/test'

test.describe('Navigation', () => {
  test('initial page is home', async ({ page }) => {
    await page.goto('http://localhost:5173')

    await expect(page.getByRole('heading', { name: 'Home' })).toBeVisible()
  })

  test('go to users page', async ({ page }) => {
    await page.goto('http://localhost:5173')

    await page.getByRole('link', { name: 'Users' }).click()

    await expect(page.getByRole('heading', { name: 'Users' })).toBeVisible()
  })
})
