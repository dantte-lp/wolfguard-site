#!/usr/bin/env python3

import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Set up Chrome options
chrome_options = Options()
chrome_options.add_argument('--headless')
chrome_options.add_argument('--no-sandbox')
chrome_options.add_argument('--disable-dev-shm-usage')
chrome_options.add_argument('--window-size=1920,1080')

try:
    # Create driver
    driver = webdriver.Chrome(options=chrome_options)

    # Load the page
    print("Loading http://localhost:8080...")
    driver.get("http://localhost:8080")

    # Wait for React to render
    wait = WebDriverWait(driver, 10)
    wait.until(EC.presence_of_element_located((By.CLASS_NAME, "min-h-screen")))
    time.sleep(2)  # Give extra time for full render

    print("\n=== Analyzing Page Structure ===\n")

    # Check for main sections
    sections = [
        ("Hero", "section.min-h-\\[90vh\\]"),
        ("Features", "#features"),
        ("QuickStart", "#quickstart"),
        ("Links", "#links"),
        ("Footer", "footer")
    ]

    for name, selector in sections:
        try:
            if selector.startswith("#"):
                element = driver.find_element(By.CSS_SELECTOR, selector)
            else:
                element = driver.find_element(By.CSS_SELECTOR, selector)

            if element:
                # Get computed styles
                left = driver.execute_script("return window.getComputedStyle(arguments[0]).marginLeft;", element)
                right = driver.execute_script("return window.getComputedStyle(arguments[0]).marginRight;", element)
                width = driver.execute_script("return window.getComputedStyle(arguments[0]).width;", element)
                max_width = driver.execute_script("return window.getComputedStyle(arguments[0]).maxWidth;", element)

                # Get bounding rect
                rect = driver.execute_script("return arguments[0].getBoundingClientRect();", element)

                print(f"{name} Section:")
                print(f"  Found: ✓")
                print(f"  Margin L/R: {left} / {right}")
                print(f"  Width: {width}")
                print(f"  Max-width: {max_width}")
                print(f"  Position - Left: {rect['left']}px, Width: {rect['width']}px")

                # Check for max-w-7xl container
                try:
                    container = element.find_element(By.CSS_SELECTOR, ".max-w-7xl")
                    container_left = driver.execute_script("return window.getComputedStyle(arguments[0]).marginLeft;", container)
                    container_right = driver.execute_script("return window.getComputedStyle(arguments[0]).marginRight;", container)
                    container_width = driver.execute_script("return window.getComputedStyle(arguments[0]).width;", container)
                    container_rect = driver.execute_script("return arguments[0].getBoundingClientRect();", container)

                    print(f"  Inner Container (.max-w-7xl):")
                    print(f"    Margin L/R: {container_left} / {container_right}")
                    print(f"    Width: {container_width}")
                    print(f"    Position - Left: {container_rect['left']}px")
                except:
                    print(f"  Inner Container: Not found")

        except Exception as e:
            print(f"{name} Section: ✗ Not found")
        print()

    # Check viewport width
    viewport_width = driver.execute_script("return window.innerWidth;")
    print(f"Viewport width: {viewport_width}px")

    # Take screenshot
    driver.save_screenshot("/opt/projects/repositories/wolfguard-site/debug/selenium-screenshot.png")
    print("\nScreenshot saved to selenium-screenshot.png")

    # Save the full HTML
    with open("/opt/projects/repositories/wolfguard-site/debug/rendered.html", "w") as f:
        f.write(driver.page_source)
    print("Full HTML saved to rendered.html")

finally:
    driver.quit()