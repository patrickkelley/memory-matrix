---

# **🚀 Complete PRD: Memory Matrix**

## **1\. Introduction and Goal**

* **Game Name:** Memory Matrix  
* **Version:** 1.0 (Minimum Viable Product \- MVP)  
* **Target Audience:** Casual gamers, students, and anyone looking to challenge their working memory and focus.  
* **Core Goal:** To become the definitive, adaptive digital test of numeric working memory, providing clear progression and high replayability.  
* **Target KPI:** Player retention based on repeat attempts to beat their High Score (Digit Level).

---

## **2\. Core Gameplay Loop and Features**

| ID | Feature | Description | Status (MVP) |
| :---- | :---- | :---- | :---- |
| **3.1** | **Starting Difficulty** | Game begins at **Digit Level 1** (a single random digit, 0-9). | Required |
| **3.2** | **Memorization Phase (Display)** | Display the numeric sequence. The sequence must be generated randomly. | Required |
| **3.3** | **Next Button (Transition)** | After the display time expires (3.4), the **"Next"** button appears. | Required |
| **3.4** | **Memorization Duration (Crucial Spec)** | The display time is calculated as: **$1.5 \\text{ seconds} \+ (0.5 \\text{ seconds} \\times \\text{Digit Level})$.** | Required |
| **3.5** | **Input Phase** | A clean screen with a numeric input field (or virtual keypad) and the prompt: "Recall the sequence." | Required |
| **3.6** | **Input Flexibility** | The input field must allow both direct typing and tapping of a virtual keypad. | Required |
| **3.7** | **Submission & Validation** | Player clicks **"Submit."** The system validates the input against the original sequence. | Required |

---

## **3\. Adaptive Difficulty Scaling (The Matrix Flow)**

The game must implement the following adaptive scaling rules upon submission:

* **Success Rule (Correct Answer):** The player's **Digit Level** increases by **$+1$**.  
* **Failure Rule (Incorrect Answer):** The player's **Digit Level** decreases by **$-1$**.  
* **Minimum Level Constraint:** The Digit Level must be floored at **1**. (Level $\\text{new} \= \\max(1, \\text{Level}\_\\text{old} \- 1)$).

**Scoring:**

* The primary score is the **Current Digit Level**.  
* The **High Score** is the Highest Digit Level Reached and must be persistently saved (locally).

---

## **4\. Visual Design and Aesthetics**

The color scheme must be minimalist and conducive to concentration:

| Color Name | Hex Code (Example) | Usage |
| :---- | :---- | :---- |
| **Primary Blue (Dark)** | \#0C2B4C | Backgrounds, Borders, Main Navigation. |
| **Secondary Blue (Light)** | \#70B8F9 | Accent, Interactive Elements (Buttons), Current Digit Level Display. |
| **Primary White** | \#FFFFFF | Main Text, Numbers, Input Field Backgrounds. |

**Typography:**

* **Memorization Phase:** A **monospaced** (fixed-width) font is mandatory for the number sequence for maximum clarity.  
* **UI/Menu Text:** A highly readable sans-serif font.

**Feedback:**

* **Success (Correct):** Utilize a flash or overlay of **Green** (\#38C172).  
* **Failure (Incorrect):** Utilize a flash or overlay of **Red** (\#E3342F) and briefly show the correct number.

---

## **5\. User Interface (UI) Flow**

The game follows a continuous, looped process:

| State | Transition (Action) | Destination |
| :---- | :---- | :---- |
| **A. Main Menu** | Player clicks **"Start Game"** | **B. Memorization Phase** |
| **B. Memorization Phase** | **Timer Expires** (Dynamic time) | **C. Transition State** |
| **C. Transition State** | Player clicks **"Next"** | **D. Input Phase** |
| **D. Input Phase** | Player clicks **"Submit"** | **E. Feedback Phase** |
| **E. Feedback Phase** | **Timer Expires** (2-second display) | **B. Memorization Phase** (at the new adjusted level) |

---

## **6\. Technical Architecture Summary**

* **Technology Stack (Recommended):** React/Vue (for web/mobile deployment) for the frontend. Local Storage for MVP persistence.  
* **Architecture:** Clear separation using Model-View-Controller/ViewModel pattern.  
* **Model Components:** Must include dedicated modules for **Sequence Generation**, **Validation**, and **Scaling Logic** to manage the adaptive rules.  
* **Persistence:** High Score must be stored locally (e.g., using browser Local Storage).

---

## **7\. Quality Assurance (QA) Key Test Cases**

The following test cases must pass before launch:

| ID | Test Case Title | Target Level Check |
| :---- | :---- | :---- |
| **F-1.2** | **Success $\\uparrow$ Scale** | Level must increase by $+1$ upon correct input. |
| **F-1.4** | **Minimum Level Floor** | Level 1 must remain 1 upon incorrect input. |
| **P-2.2** | **Level 5 Display Time** | Display duration must be **4.0 seconds** ($\\pm 100 \\text{ms}$). |
| **U-3.2** | **Font Check** | Sequence numbers must use the specified **monospaced font**. |

---

## **8\. Rules of Engagement (In-Game Text)**

* **Objective:** Achieve the highest possible **Digit Level**.  
* **Adaptive Matrix:** If your recall is **Correct**, the Digit Level increases by **\+1**. If **Incorrect**, the Digit Level decreases by **\-1**. The level never drops below 1\.
