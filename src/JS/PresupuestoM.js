export const budgets = JSON.parse(sessionStorage.getItem('budgets')) || [];

export function getTotalBudget() {
    return parseFloat(sessionStorage.getItem('totalMonthlyBudget')) || 0;
}

export function setTotalBudget(amount) {
    sessionStorage.setItem('totalMonthlyBudget', amount);
}
