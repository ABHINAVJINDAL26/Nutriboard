const API_BASE_URL = import.meta.env.VITE_API_BASE_URL 
  ? `${import.meta.env.VITE_API_BASE_URL}/api`
  : 'http://localhost:5000/api';

export async function getFoodSummary() {
  const res = await fetch(`${API_BASE_URL}/foods`);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to fetch food summary');
  }
  return res.json();
}

export async function addFoodItem(name, grams) {
  const res = await fetch(`${API_BASE_URL}/foods`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, grams })
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to add food item');
  }
  return res.json();
}

export async function simulateImageUpload() {
  const res = await fetch(`${API_BASE_URL}/foods`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ mock: true })
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to simulate photo scan');
  }
  return res.json();
}

export async function deleteFoodItem(id) {
  const res = await fetch(`${API_BASE_URL}/foods/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to delete food item');
  }
  return res.json();
}

export async function changeGoal(goal) {
  const res = await fetch(`${API_BASE_URL}/goal`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ goal })
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to update fitness goal');
  }
  return res.json();
}


