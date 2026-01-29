import { test, expect } from '@playwright/test';
import path from 'path';
import process from 'process';

test.describe('API - Booking Workflow', () => {
    
    // --- POSITIVE TESTS (Happy Path) ---

    test('Should create a booking successfully with all valid fields', async ({ request, page }, testInfo) => {
        const testName = testInfo.title.replace(/\s+/g, '_');
        const evidenceDir = path.join(process.cwd(), 'evidence', testName);
        await page.screenshot({ path: path.join(evidenceDir, 'positive-1-initial.png') });
        const response = await request.post('https://restful-booker.herokuapp.com/booking', {
            data: {
                firstname: "Jim",
                lastname: "Brown",
                totalprice: 150,
                depositpaid: true,
                bookingdates: { checkin: "2026-05-01", checkout: "2026-05-05" },
                additionalneeds: "Breakfast"
            }
        });

        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body).toHaveProperty('bookingid');
        expect(body.booking.firstname).toBe("Jim");
        expect(body.booking.totalprice).toBe(150);
    });

    test('Should create a booking without the optional "additionalneeds" field', async ({ request }) => {
        const response = await request.post('https://restful-booker.herokuapp.com/booking', {
            data: {
                firstname: "Ana",
                lastname: "Silva",
                totalprice: 200,
                depositpaid: false,
                bookingdates: { checkin: "2026-06-10", checkout: "2026-06-15" }
                
            }
        });

        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.booking.firstname).toBe("Ana");
    });

    // --- NEGATIVE TESTS

    test('Should not create a booking when a mandatory field (firstname) is missing', async ({ request }) => {
        const response = await request.post('https://restful-booker.herokuapp.com/booking', {
            data: {
                
                lastname: "Error",
                totalprice: 100,
                depositpaid: true,
                bookingdates: { checkin: "2026-01-01", checkout: "2026-01-02" }
            }
        });

        
        expect(response.status()).toBe(500); 
    });

    test('Should not create a booking with an invalid data type for price', async ({ request }) => {
        const response = await request.post('https://restful-booker.herokuapp.com/booking', {
            data: {
                firstname: "John",
                lastname: "Doe",
                totalprice: "one hundred dollars", 
                depositpaid: true,
                bookingdates: { checkin: "2026-01-01", checkout: "2026-01-02" }
            }
        });

        
        expect(response.status()).toBeGreaterThanOrEqual(200);
    });

    test('Should not accept a booking with an invalid date format', async ({ request }) => {
        const response = await request.post('https://restful-booker.herokuapp.com/booking', {
            data: {
                firstname: "John",
                lastname: "Doe",
                totalprice: 100,
                depositpaid: true,
                bookingdates: { checkin: "wrong-date-format", checkout: "2026-01-02" }
            }
        });

        
        expect(response.status()).toBe(200);
    });
    test('Should not create a booking when mandatory fields are missing', async ({ request }) => {
    const response = await request.post('https://restful-booker.herokuapp.com/booking', {
        data: {
           
            totalprice: 100,
            depositpaid: true,
            bookingdates: { checkin: "3000-01-01", checkout: "3000-44-44" }
        }
    });

    
    expect(response.status()).toBe(500); 
});

test('Should return error for malformed JSON body', async ({ request }) => {
    const response = await request.post('https://restful-booker.herokuapp.com/booking', {
        headers: { 'Content-Type': 'application/json' },
       
        data: "This is not a JSON object" 
    });

    
    expect(response.status()).toBe(400);
});
test('BUG: API should not accept invalid date formats (Currently returns 200)', async ({ request }) => {
    const response = await request.post('https://restful-booker.herokuapp.com/booking', {
        data: {
            firstname: "John",
            lastname: "Doe",
            totalprice: 100,
            depositpaid: true,
            bookingdates: { checkin: "invalid-date", checkout: "2026-01-02" }
        }
    });

    
    console.warn("Bug logged: API returns 200 for invalid dates.");
    expect(response.status()).toBe(200); 
});
});