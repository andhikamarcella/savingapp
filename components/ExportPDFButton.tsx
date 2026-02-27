'use client'

import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { formatCurrency } from '@/lib/currencyFormatter'
import type { Goal } from '@/lib/types'
import { remainingDays } from '@/lib/calculatePlan'

export const exportGoalPDF = async (goal: Goal) => {
  // Create a hidden container for the report
  const container = document.createElement('div')
  container.style.position = 'absolute'
  container.style.left = '-9999px'
  container.style.top = '0'
  container.style.width = '800px'
  container.style.backgroundColor = '#fdf2f8' // hk-50 background
  container.style.color = '#0f172a' // slate-900 text
  container.style.padding = '40px'
  container.style.fontFamily = 'system-ui, -apple-system, sans-serif'

  // Build the HTML structure mimicking the app theme
  const progress = Math.min(100, (goal.savedAmount / goal.targetAmount) * 100)

  let html = `
    <div style="background: white; border-radius: 24px; padding: 32px; box-shadow: 0 10px 25px rgba(236, 72, 153, 0.1); border: 1px solid #fce7f3; margin-bottom: 24px;">
      <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 24px;">
        <span style="font-size: 48px; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">${goal.emoji}</span>
        <div>
          <h1 style="margin: 0; font-size: 32px; font-weight: 800; background: linear-gradient(to right, #db2777, #f472b6); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
            ${goal.title}
          </h1>
          <p style="margin: 4px 0 0 0; color: #db2777; font-weight: bold;">Money Saving Planner Pro Report</p>
        </div>
      </div>
      
      <div style="display: flex; flex-wrap: wrap; gap: 16px;">
        <div style="flex: 1; min-width: 200px; background: #fff5f9; border-radius: 16px; padding: 20px; border: 1px solid #fce7f3;">
          <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: bold; color: #64748b; text-transform: uppercase; letter-spacing: 1px;">Saved</p>
          <p style="margin: 0; font-size: 32px; font-weight: 800; color: #db2777;">${formatCurrency(goal.savedAmount, goal.currency)}</p>
        </div>
        <div style="flex: 1; min-width: 150px; background: #f8fafc; border-radius: 16px; padding: 20px; border: 1px solid #f1f5f9;">
          <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: bold; color: #64748b; text-transform: uppercase;">Target</p>
          <p style="margin: 0; font-size: 24px; font-weight: bold; color: #1e293b;">${formatCurrency(goal.targetAmount, goal.currency)}</p>
        </div>
        <div style="flex: 1; min-width: 150px; background: #f8fafc; border-radius: 16px; padding: 20px; border: 1px solid #f1f5f9;">
          <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: bold; color: #64748b; text-transform: uppercase;">Progress</p>
          <p style="margin: 0; font-size: 24px; font-weight: bold; color: #1e293b;">${progress.toFixed(1)}%</p>
        </div>
      </div>
      
      <div style="margin-top: 16px; display: flex; gap: 16px;">
        <div style="flex: 1; background: #f8fafc; border-radius: 16px; padding: 20px; border: 1px solid #f1f5f9;">
          <p style="margin: 0 0 4px 0; font-size: 14px; font-weight: bold; color: #64748b;">Target Date</p>
          <p style="margin: 0; font-size: 18px; font-weight: bold; color: #1e293b;">${new Date(goal.targetDate).toLocaleDateString()}</p>
        </div>
        <div style="flex: 1; background: #f8fafc; border-radius: 16px; padding: 20px; border: 1px solid #f1f5f9;">
          <p style="margin: 0 0 4px 0; font-size: 14px; font-weight: bold; color: #64748b;">Days Left</p>
          <p style="margin: 0; font-size: 18px; font-weight: bold; color: #1e293b;">${remainingDays(goal.targetDate)} Days</p>
        </div>
        <div style="flex: 1; background: #f8fafc; border-radius: 16px; padding: 20px; border: 1px solid #f1f5f9;">
          <p style="margin: 0 0 4px 0; font-size: 14px; font-weight: bold; color: #64748b;">Plan Type</p>
          <p style="margin: 0; font-size: 18px; font-weight: bold; color: #1e293b; text-transform: capitalize;">${goal.planType}</p>
        </div>
      </div>
    </div>
    
    <div style="background: white; border-radius: 24px; padding: 32px; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.03); border: 1px solid #f1f5f9;">
      <h2 style="margin: 0 0 20px 0; font-size: 24px; font-weight: 800; color: #1e293b;">Transaction History</h2>
  `

  if (goal.transactions.length === 0) {
    html += '<p style="color: #94a3b8; font-style: italic;">No transactions recorded yet.</p>'
  } else {
    html += '<div style="display: flex; flex-direction: column; gap: 12px;">'
    const sortedTxs = [...goal.transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    sortedTxs.forEach((tx) => {
      const isDep = tx.type === 'deposit'
      html += `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; background: ${isDep ? '#fff5f9' : '#fff1f2'}; border: 1px solid ${isDep ? '#fce7f3' : '#ffe4e6'}; border-radius: 12px;">
          <div>
            <p style="margin: 0; font-weight: bold; font-size: 16px; color: ${isDep ? '#db2777' : '#ef4444'}">${isDep ? '+' : '-'}${formatCurrency(tx.amount, goal.currency)}</p>
            <p style="margin: 4px 0 0 0; font-size: 14px; color: #64748b;">${new Date(tx.date).toLocaleString()} ${tx.note ? `— ${tx.note}` : ''}</p>
          </div>
          <span style="font-size: 12px; font-weight: bold; text-transform: uppercase; color: ${isDep ? '#db2777' : '#ef4444'}; padding: 4px 10px; background: ${isDep ? '#fdf2f8' : '#fef2f2'}; border-radius: 9999px;">
            ${tx.type}
          </span>
        </div>
      `
    })
    html += '</div>'
  }
  html += '</div>'

  container.innerHTML = html
  document.body.appendChild(container)

  try {
    // Render HTML to Canvas
    const canvas = await html2canvas(container, {
      scale: 2, // High resolution
      useCORS: true,
      backgroundColor: '#fdf2f8',
    })

    // Calculate aspect ratio for A4
    const imgWidth = 210 // mm (A4)
    const pageHeight = 297 // mm (A4)
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    let heightLeft = imgHeight

    const pdf = new jsPDF('p', 'mm', 'a4')
    let position = 0

    // Add first page
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight

    // Add subsequent pages if content overflows
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }

    pdf.save(`${goal.title}-saving-report.pdf`)
  } catch (error) {
    console.error('Failed to generate PDF:', error)
  } finally {
    document.body.removeChild(container)
  }
}

export const ExportPDFButton = ({ goal }: { goal: Goal }) => (
  <button className="btn-secondary" onClick={() => exportGoalPDF(goal)}>
    Export PDF
  </button>
)
