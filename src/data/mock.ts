// ============================================
// JunkMint Mock Data
// Shared fixtures for all screens
// ============================================

export interface Request {
  id: string
  customerName: string
  phone: string
  email: string
  address: string
  city: string
  source: 'phone' | 'text' | 'web' | 'google' | 'yelp' | 'referral'
  description: string
  urgency: 'low' | 'normal' | 'high' | 'emergency'
  status: 'new' | 'contacted' | 'quoted' | 'booked' | 'lost'
  photos: number
  createdAt: string
  followUpDate: string | null
  notes: string
}

export interface QuoteLineItem {
  id: string
  description: string
  volume: string
  price: number
}

export interface Quote {
  id: string
  requestId: string
  customerName: string
  address: string
  phone: string
  items: QuoteLineItem[]
  total: number
  status: 'draft' | 'sent' | 'viewed' | 'approved' | 'declined' | 'expired'
  createdAt: string
  sentAt: string | null
  expiresAt: string
  notes: string
  volumeEstimate: string
}

export interface Job {
  id: string
  quoteId: string
  customerName: string
  address: string
  city: string
  phone: string
  status: 'scheduled' | 'en_route' | 'in_progress' | 'completed' | 'cancelled'
  scheduledDate: string
  scheduledTime: string
  estimatedDuration: string
  assignedCrew: string[]
  volumeQuoted: string
  volumeActual: string | null
  priceQuoted: number
  priceFinal: number | null
  dumpFee: number | null
  notes: string
  beforePhotos: number
  afterPhotos: number
  checklist: { task: string; done: boolean }[]
  changeOrders: { description: string; amount: number; approved: boolean }[]
}

export interface Client {
  id: string
  name: string
  phone: string
  email: string
  addresses: string[]
  city: string
  totalJobs: number
  totalRevenue: number
  lastJobDate: string
  source: string
  tags: string[]
  notes: string
}

export interface Invoice {
  id: string
  jobId: string
  customerName: string
  address: string
  amount: number
  status: 'draft' | 'sent' | 'due' | 'overdue' | 'paid'
  issuedAt: string
  dueDate: string
  paidAt: string | null
  paymentMethod: string | null
  items: { description: string; amount: number }[]
}

export interface CrewMember {
  id: string
  name: string
  role: 'driver' | 'helper' | 'lead'
  phone: string
  status: 'available' | 'on_job' | 'off_duty' | 'break'
  currentJob: string | null
  jobsToday: number
  avatar: string
  hireDate: string
  certifications: string[]
}

export interface InventoryItem {
  id: string
  name: string
  category: string
  quantity: number
  unit: string
  reorderLevel: number
  lastRestocked: string
  costPerUnit: number
}

export interface Document {
  id: string
  name: string
  type: 'waiver' | 'contract' | 'permit' | 'certificate' | 'photo' | 'receipt'
  clientId: string | null
  clientName: string | null
  jobId: string | null
  uploadedAt: string
  size: string
  status: 'active' | 'expired' | 'signed' | 'pending'
}

// --- MOCK DATA ---

export const requests: Request[] = [
  {
    id: 'REQ-001',
    customerName: 'Sarah Kealoha',
    phone: '(808) 555-0134',
    email: 'sarah.k@email.com',
    address: '45-123 Kaneohe Bay Dr',
    city: 'Kaneohe',
    source: 'phone',
    description: 'Full garage cleanout. Old furniture, boxes, broken appliances. Estimate 3/4 truck load.',
    urgency: 'normal',
    status: 'new',
    photos: 3,
    createdAt: '2026-09-22T08:15:00',
    followUpDate: null,
    notes: ''
  },
  {
    id: 'REQ-002',
    customerName: 'Mike Tanaka',
    phone: '(808) 555-0278',
    email: 'mtanaka@email.com',
    address: '91-1015 Kamaaha Loop',
    city: 'Kapolei',
    source: 'text',
    description: 'Moving out, need couch, mattress, and misc items removed ASAP.',
    urgency: 'high',
    status: 'contacted',
    photos: 5,
    createdAt: '2026-09-21T16:42:00',
    followUpDate: '2026-09-22',
    notes: 'Called back, wants quote today'
  },
  {
    id: 'REQ-003',
    customerName: 'Lisa Chang',
    phone: '(808) 555-0391',
    email: 'lisa.chang@email.com',
    address: '1234 Ala Moana Blvd #8C',
    city: 'Honolulu',
    source: 'web',
    description: 'Office cleanout - desks, chairs, filing cabinets, old computers',
    urgency: 'normal',
    status: 'quoted',
    photos: 8,
    createdAt: '2026-09-20T10:00:00',
    followUpDate: '2026-09-23',
    notes: 'Commercial client, property manager'
  },
  {
    id: 'REQ-004',
    customerName: 'James Nalu',
    phone: '(808) 555-0455',
    email: 'jnalu@email.com',
    address: '87-202 Farrington Hwy',
    city: 'Waianae',
    source: 'google',
    description: 'Post-renovation debris. Drywall scraps, old cabinets, tile.',
    urgency: 'normal',
    status: 'new',
    photos: 2,
    createdAt: '2026-09-22T09:30:00',
    followUpDate: null,
    notes: ''
  },
  {
    id: 'REQ-005',
    customerName: 'Maria Santos',
    phone: '(808) 555-0519',
    email: 'msantos@email.com',
    address: '94-480 Ukee St',
    city: 'Waipahu',
    source: 'referral',
    description: 'Yard waste cleanup after storm. Branches, leaves, broken fence panels.',
    urgency: 'high',
    status: 'contacted',
    photos: 4,
    createdAt: '2026-09-21T14:20:00',
    followUpDate: '2026-09-22',
    notes: 'Referred by James Nalu. Storm damage, wants fast turnaround.'
  },
  {
    id: 'REQ-006',
    customerName: 'Derek Watanabe',
    phone: '(808) 555-0623',
    email: 'dwatanabe@email.com',
    address: '46-318 Haiku Rd',
    city: 'Kaneohe',
    source: 'yelp',
    description: 'Estate cleanout. Entire house contents - furniture, clothes, kitchen items.',
    urgency: 'low',
    status: 'new',
    photos: 12,
    createdAt: '2026-09-22T07:45:00',
    followUpDate: null,
    notes: 'Multi-load job, will need 2-3 trips'
  },
  {
    id: 'REQ-007',
    customerName: 'Kailani Pua',
    phone: '(808) 555-0744',
    email: 'kpua@email.com',
    address: '59-101 Pupukea Rd',
    city: 'Haleiwa',
    source: 'phone',
    description: 'Hot tub removal from backyard. Unit is disconnected.',
    urgency: 'normal',
    status: 'booked',
    photos: 2,
    createdAt: '2026-09-19T11:00:00',
    followUpDate: null,
    notes: 'Booked for Sep 24'
  },
  {
    id: 'REQ-008',
    customerName: 'Tom Rivera',
    phone: '(808) 555-0812',
    email: 'trivera@email.com',
    address: '98-020 Kamehameha Hwy',
    city: 'Aiea',
    source: 'google',
    description: 'Single mattress and box spring removal.',
    urgency: 'low',
    status: 'lost',
    photos: 1,
    createdAt: '2026-09-18T09:00:00',
    followUpDate: null,
    notes: 'Went with competitor - price sensitive'
  },
]

export const quotes: Quote[] = [
  {
    id: 'QT-001',
    requestId: 'REQ-001',
    customerName: 'Sarah Kealoha',
    address: '45-123 Kaneohe Bay Dr',
    phone: '(808) 555-0134',
    items: [
      { id: '1', description: 'Garage cleanout - furniture, boxes, appliances', volume: '3/4 truck', price: 550 },
      { id: '2', description: 'Appliance disconnect (washer)', volume: '-', price: 50 },
    ],
    total: 600,
    status: 'sent',
    createdAt: '2026-09-22T09:00:00',
    sentAt: '2026-09-22T09:15:00',
    expiresAt: '2026-09-29',
    notes: 'Includes cleanup of garage floor',
    volumeEstimate: '3/4 truck'
  },
  {
    id: 'QT-002',
    requestId: 'REQ-002',
    customerName: 'Mike Tanaka',
    address: '91-1015 Kamaaha Loop',
    phone: '(808) 555-0278',
    items: [
      { id: '1', description: 'Couch, mattress, misc items', volume: '3/8 truck', price: 325 },
    ],
    total: 325,
    status: 'approved',
    createdAt: '2026-09-21T17:00:00',
    sentAt: '2026-09-21T17:05:00',
    expiresAt: '2026-09-28',
    notes: 'Moving out deadline Sep 30',
    volumeEstimate: '3/8 truck'
  },
  {
    id: 'QT-003',
    requestId: 'REQ-003',
    customerName: 'Lisa Chang',
    address: '1234 Ala Moana Blvd #8C',
    phone: '(808) 555-0391',
    items: [
      { id: '1', description: 'Office furniture - 4 desks, 6 chairs, 2 filing cabinets', volume: '1/2 truck', price: 400 },
      { id: '2', description: 'E-waste - computers, monitors, printers', volume: '1/8 truck', price: 150 },
      { id: '3', description: 'Stairs surcharge (8th floor, no elevator access)', volume: '-', price: 100 },
    ],
    total: 650,
    status: 'viewed',
    createdAt: '2026-09-20T11:30:00',
    sentAt: '2026-09-20T11:45:00',
    expiresAt: '2026-09-27',
    notes: 'Building requires COI. E-waste needs certified recycler.',
    volumeEstimate: '5/8 truck'
  },
  {
    id: 'QT-004',
    requestId: 'REQ-006',
    customerName: 'Derek Watanabe',
    address: '46-318 Haiku Rd',
    phone: '(808) 555-0623',
    items: [
      { id: '1', description: 'Estate cleanout - Load 1 (bedrooms)', volume: 'Full truck', price: 700 },
      { id: '2', description: 'Estate cleanout - Load 2 (living/kitchen)', volume: 'Full truck', price: 700 },
      { id: '3', description: 'Estate cleanout - Load 3 (garage/yard)', volume: '3/4 truck', price: 550 },
      { id: '4', description: 'Donation sorting and drop-off', volume: '-', price: 100 },
    ],
    total: 2050,
    status: 'draft',
    createdAt: '2026-09-22T10:00:00',
    sentAt: null,
    expiresAt: '2026-10-06',
    notes: 'Multi-day job. Family wants to keep some items - will tag before crew arrives.',
    volumeEstimate: '2.75 trucks'
  },
  {
    id: 'QT-005',
    requestId: 'REQ-005',
    customerName: 'Maria Santos',
    address: '94-480 Ukee St',
    phone: '(808) 555-0519',
    items: [
      { id: '1', description: 'Yard waste - branches, leaves, fence panels', volume: '1/2 truck', price: 400 },
    ],
    total: 400,
    status: 'approved',
    createdAt: '2026-09-21T15:00:00',
    sentAt: '2026-09-21T15:10:00',
    expiresAt: '2026-09-28',
    notes: 'Storm debris. Needs pickup before weekend.',
    volumeEstimate: '1/2 truck'
  }
]

export const jobs: Job[] = [
  {
    id: 'JOB-001',
    quoteId: 'QT-002',
    customerName: 'Mike Tanaka',
    address: '91-1015 Kamaaha Loop',
    city: 'Kapolei',
    phone: '(808) 555-0278',
    status: 'scheduled',
    scheduledDate: '2026-09-22',
    scheduledTime: '9:00 AM',
    estimatedDuration: '1.5 hrs',
    assignedCrew: ['Kai Nakamura', 'Braddah Joe'],
    volumeQuoted: '3/8 truck',
    volumeActual: null,
    priceQuoted: 325,
    priceFinal: null,
    dumpFee: null,
    notes: 'Moving out by Sep 30. Second floor apartment, has elevator.',
    beforePhotos: 0,
    afterPhotos: 0,
    checklist: [
      { task: 'Confirm arrival with customer', done: false },
      { task: 'Take before photos', done: false },
      { task: 'Load items onto truck', done: false },
      { task: 'Sweep area clean', done: false },
      { task: 'Take after photos', done: false },
      { task: 'Get customer sign-off', done: false },
    ],
    changeOrders: []
  },
  {
    id: 'JOB-002',
    quoteId: 'QT-005',
    customerName: 'Maria Santos',
    address: '94-480 Ukee St',
    city: 'Waipahu',
    phone: '(808) 555-0519',
    status: 'in_progress',
    scheduledDate: '2026-09-22',
    scheduledTime: '11:30 AM',
    estimatedDuration: '2 hrs',
    assignedCrew: ['Kai Nakamura', 'Braddah Joe'],
    volumeQuoted: '1/2 truck',
    volumeActual: '5/8 truck',
    priceQuoted: 400,
    priceFinal: null,
    dumpFee: null,
    notes: 'Storm debris. Customer referred by James Nalu.',
    beforePhotos: 3,
    afterPhotos: 0,
    checklist: [
      { task: 'Confirm arrival with customer', done: true },
      { task: 'Take before photos', done: true },
      { task: 'Load items onto truck', done: false },
      { task: 'Sweep area clean', done: false },
      { task: 'Take after photos', done: false },
      { task: 'Get customer sign-off', done: false },
    ],
    changeOrders: [
      { description: 'Additional yard waste behind shed - upgrade to 5/8 truck', amount: 75, approved: true }
    ]
  },
  {
    id: 'JOB-003',
    quoteId: '',
    customerName: 'Kailani Pua',
    address: '59-101 Pupukea Rd',
    city: 'Haleiwa',
    phone: '(808) 555-0744',
    status: 'scheduled',
    scheduledDate: '2026-09-24',
    scheduledTime: '8:00 AM',
    estimatedDuration: '3 hrs',
    assignedCrew: ['Manu Silva', 'Kai Nakamura'],
    volumeQuoted: '1/2 truck',
    volumeActual: null,
    priceQuoted: 450,
    priceFinal: null,
    dumpFee: null,
    notes: 'Hot tub removal. Unit disconnected. Need dolly and straps. Heavy item.',
    beforePhotos: 0,
    afterPhotos: 0,
    checklist: [
      { task: 'Confirm arrival with customer', done: false },
      { task: 'Take before photos', done: false },
      { task: 'Disconnect and remove hot tub', done: false },
      { task: 'Clean up area', done: false },
      { task: 'Take after photos', done: false },
      { task: 'Get customer sign-off', done: false },
    ],
    changeOrders: []
  },
  {
    id: 'JOB-004',
    quoteId: '',
    customerName: 'Pacific Property Mgmt',
    address: '2100 Kalakaua Ave #305',
    city: 'Honolulu',
    phone: '(808) 555-0900',
    status: 'completed',
    scheduledDate: '2026-09-20',
    scheduledTime: '7:00 AM',
    estimatedDuration: '2 hrs',
    assignedCrew: ['Manu Silva', 'Braddah Joe'],
    volumeQuoted: '1/2 truck',
    volumeActual: '1/2 truck',
    priceQuoted: 425,
    priceFinal: 425,
    dumpFee: 65,
    notes: 'Tenant moveout cleanout. Commercial recurring client.',
    beforePhotos: 4,
    afterPhotos: 4,
    checklist: [
      { task: 'Confirm arrival with customer', done: true },
      { task: 'Take before photos', done: true },
      { task: 'Load items onto truck', done: true },
      { task: 'Sweep area clean', done: true },
      { task: 'Take after photos', done: true },
      { task: 'Get customer sign-off', done: true },
    ],
    changeOrders: []
  },
  {
    id: 'JOB-005',
    quoteId: '',
    customerName: 'Robert Akana',
    address: '47-388 Hui Iwa St',
    city: 'Kaneohe',
    phone: '(808) 555-0667',
    status: 'completed',
    scheduledDate: '2026-09-19',
    scheduledTime: '10:00 AM',
    estimatedDuration: '1 hr',
    assignedCrew: ['Kai Nakamura'],
    volumeQuoted: '1/4 truck',
    volumeActual: '1/4 truck',
    priceQuoted: 250,
    priceFinal: 250,
    dumpFee: 45,
    notes: 'Old washer and dryer removal. Ground floor, easy access.',
    beforePhotos: 2,
    afterPhotos: 2,
    checklist: [
      { task: 'Confirm arrival with customer', done: true },
      { task: 'Take before photos', done: true },
      { task: 'Remove appliances', done: true },
      { task: 'Sweep area clean', done: true },
      { task: 'Take after photos', done: true },
      { task: 'Get customer sign-off', done: true },
    ],
    changeOrders: []
  },
  {
    id: 'JOB-006',
    quoteId: '',
    customerName: 'Aloha Construction LLC',
    address: '98-450 Koauka Loop',
    city: 'Aiea',
    phone: '(808) 555-0433',
    status: 'completed',
    scheduledDate: '2026-09-18',
    scheduledTime: '6:30 AM',
    estimatedDuration: '4 hrs',
    assignedCrew: ['Manu Silva', 'Kai Nakamura', 'Braddah Joe'],
    volumeQuoted: 'Full truck',
    volumeActual: 'Full truck',
    priceQuoted: 750,
    priceFinal: 750,
    dumpFee: 120,
    notes: 'Construction debris. Drywall, lumber, tile. Dump run to PVT Land.',
    beforePhotos: 5,
    afterPhotos: 3,
    checklist: [
      { task: 'Confirm arrival with foreman', done: true },
      { task: 'Take before photos', done: true },
      { task: 'Load debris onto truck', done: true },
      { task: 'Sweep and broom clean site', done: true },
      { task: 'Take after photos', done: true },
      { task: 'Get foreman sign-off', done: true },
    ],
    changeOrders: []
  },
]

export const clients: Client[] = [
  { id: 'CL-001', name: 'Sarah Kealoha', phone: '(808) 555-0134', email: 'sarah.k@email.com', addresses: ['45-123 Kaneohe Bay Dr'], city: 'Kaneohe', totalJobs: 0, totalRevenue: 0, lastJobDate: '', source: 'Phone', tags: ['residential'], notes: 'New lead, garage cleanout' },
  { id: 'CL-002', name: 'Mike Tanaka', phone: '(808) 555-0278', email: 'mtanaka@email.com', addresses: ['91-1015 Kamaaha Loop'], city: 'Kapolei', totalJobs: 1, totalRevenue: 325, lastJobDate: '2026-09-22', source: 'Text', tags: ['residential'], notes: 'Moving out' },
  { id: 'CL-003', name: 'Lisa Chang', phone: '(808) 555-0391', email: 'lisa.chang@email.com', addresses: ['1234 Ala Moana Blvd #8C'], city: 'Honolulu', totalJobs: 0, totalRevenue: 0, lastJobDate: '', source: 'Web', tags: ['commercial', 'property-manager'], notes: 'Office cleanout, needs COI' },
  { id: 'CL-004', name: 'James Nalu', phone: '(808) 555-0455', email: 'jnalu@email.com', addresses: ['87-202 Farrington Hwy'], city: 'Waianae', totalJobs: 2, totalRevenue: 580, lastJobDate: '2026-08-15', source: 'Google', tags: ['residential', 'repeat'], notes: 'Good referral source' },
  { id: 'CL-005', name: 'Maria Santos', phone: '(808) 555-0519', email: 'msantos@email.com', addresses: ['94-480 Ukee St'], city: 'Waipahu', totalJobs: 1, totalRevenue: 475, lastJobDate: '2026-09-22', source: 'Referral', tags: ['residential'], notes: 'Referred by James Nalu' },
  { id: 'CL-006', name: 'Pacific Property Mgmt', phone: '(808) 555-0900', email: 'ops@pacificpm.com', addresses: ['2100 Kalakaua Ave #305', '1450 Piikoi St #201'], city: 'Honolulu', totalJobs: 8, totalRevenue: 4200, lastJobDate: '2026-09-20', source: 'Referral', tags: ['commercial', 'recurring', 'property-manager'], notes: 'Monthly recurring. Net 30 terms.' },
  { id: 'CL-007', name: 'Robert Akana', phone: '(808) 555-0667', email: 'rakana@email.com', addresses: ['47-388 Hui Iwa St'], city: 'Kaneohe', totalJobs: 3, totalRevenue: 875, lastJobDate: '2026-09-19', source: 'Google', tags: ['residential', 'repeat'], notes: 'Repeat customer. Easy jobs, always pays on time.' },
  { id: 'CL-008', name: 'Aloha Construction LLC', phone: '(808) 555-0433', email: 'dispatch@alohaconstruction.com', addresses: ['98-450 Koauka Loop', '94-200 Leokane St'], city: 'Aiea', totalJobs: 5, totalRevenue: 3850, lastJobDate: '2026-09-18', source: 'Referral', tags: ['commercial', 'contractor', 'recurring'], notes: 'Construction debris. Usually full loads. Great payer.' },
  { id: 'CL-009', name: 'Derek Watanabe', phone: '(808) 555-0623', email: 'dwatanabe@email.com', addresses: ['46-318 Haiku Rd'], city: 'Kaneohe', totalJobs: 0, totalRevenue: 0, lastJobDate: '', source: 'Yelp', tags: ['residential', 'estate'], notes: 'Estate cleanout, multi-load' },
  { id: 'CL-010', name: 'Kailani Pua', phone: '(808) 555-0744', email: 'kpua@email.com', addresses: ['59-101 Pupukea Rd'], city: 'Haleiwa', totalJobs: 1, totalRevenue: 450, lastJobDate: '2026-09-24', source: 'Phone', tags: ['residential'], notes: 'Hot tub removal' },
]

export const invoices: Invoice[] = [
  {
    id: 'INV-001',
    jobId: 'JOB-004',
    customerName: 'Pacific Property Mgmt',
    address: '2100 Kalakaua Ave #305',
    amount: 425,
    status: 'paid',
    issuedAt: '2026-09-20',
    dueDate: '2026-10-20',
    paidAt: '2026-09-21',
    paymentMethod: 'Card on file',
    items: [{ description: 'Tenant moveout cleanout - 1/2 truck', amount: 425 }]
  },
  {
    id: 'INV-002',
    jobId: 'JOB-005',
    customerName: 'Robert Akana',
    address: '47-388 Hui Iwa St',
    amount: 250,
    status: 'paid',
    issuedAt: '2026-09-19',
    dueDate: '2026-09-19',
    paidAt: '2026-09-19',
    paymentMethod: 'Card on file',
    items: [{ description: 'Washer and dryer removal - 1/4 truck', amount: 250 }]
  },
  {
    id: 'INV-003',
    jobId: 'JOB-006',
    customerName: 'Aloha Construction LLC',
    address: '98-450 Koauka Loop',
    amount: 750,
    status: 'overdue',
    issuedAt: '2026-09-18',
    dueDate: '2026-09-18',
    paidAt: null,
    paymentMethod: null,
    items: [{ description: 'Construction debris removal - Full truck', amount: 750 }]
  },
  {
    id: 'INV-004',
    jobId: '',
    customerName: 'Pacific Property Mgmt',
    address: '1450 Piikoi St #201',
    amount: 375,
    status: 'sent',
    issuedAt: '2026-09-17',
    dueDate: '2026-10-17',
    paidAt: null,
    paymentMethod: null,
    items: [{ description: 'Monthly common area cleanout - 3/8 truck', amount: 375 }]
  },
  {
    id: 'INV-005',
    jobId: '',
    customerName: 'James Nalu',
    address: '87-202 Farrington Hwy',
    amount: 280,
    status: 'overdue',
    issuedAt: '2026-08-15',
    dueDate: '2026-08-15',
    paidAt: null,
    paymentMethod: null,
    items: [{ description: 'Post-renovation cleanup - 1/4 truck', amount: 280 }]
  },
  {
    id: 'INV-006',
    jobId: '',
    customerName: 'Aloha Construction LLC',
    address: '94-200 Leokane St',
    amount: 700,
    status: 'paid',
    issuedAt: '2026-09-10',
    dueDate: '2026-09-10',
    paidAt: '2026-09-12',
    paymentMethod: 'Check',
    items: [{ description: 'Demolition debris - Full truck', amount: 700 }]
  },
]

export const crew: CrewMember[] = [
  { id: 'CR-001', name: 'Kai Nakamura', role: 'lead', phone: '(808) 555-1001', status: 'on_job', currentJob: 'JOB-002', jobsToday: 2, avatar: 'KN', hireDate: '2025-06-15', certifications: ['CDL-B', 'OSHA-10', 'First Aid'] },
  { id: 'CR-002', name: 'Braddah Joe', role: 'helper', phone: '(808) 555-1002', status: 'on_job', currentJob: 'JOB-002', jobsToday: 2, avatar: 'BJ', hireDate: '2025-09-01', certifications: ['OSHA-10'] },
  { id: 'CR-003', name: 'Manu Silva', role: 'driver', phone: '(808) 555-1003', status: 'available', currentJob: null, jobsToday: 0, avatar: 'MS', hireDate: '2026-01-10', certifications: ['CDL-B', 'OSHA-10', 'Hazmat Awareness'] },
]

export const inventory: InventoryItem[] = [
  { id: 'INV-I-001', name: 'Moving blankets', category: 'Protection', quantity: 12, unit: 'ea', reorderLevel: 5, lastRestocked: '2026-09-01', costPerUnit: 25 },
  { id: 'INV-I-002', name: 'Ratchet straps', category: 'Loading', quantity: 8, unit: 'ea', reorderLevel: 4, lastRestocked: '2026-08-15', costPerUnit: 18 },
  { id: 'INV-I-003', name: 'Heavy-duty trash bags (42 gal)', category: 'Supplies', quantity: 150, unit: 'ea', reorderLevel: 50, lastRestocked: '2026-09-10', costPerUnit: 0.85 },
  { id: 'INV-I-004', name: 'Work gloves (pairs)', category: 'PPE', quantity: 6, unit: 'pair', reorderLevel: 8, lastRestocked: '2026-08-20', costPerUnit: 12 },
  { id: 'INV-I-005', name: 'Brooms', category: 'Cleanup', quantity: 3, unit: 'ea', reorderLevel: 2, lastRestocked: '2026-07-01', costPerUnit: 15 },
  { id: 'INV-I-006', name: 'Dollies (hand truck)', category: 'Equipment', quantity: 2, unit: 'ea', reorderLevel: 1, lastRestocked: '2026-03-01', costPerUnit: 120 },
  { id: 'INV-I-007', name: 'Dust masks (N95)', category: 'PPE', quantity: 3, unit: 'box', reorderLevel: 5, lastRestocked: '2026-08-01', costPerUnit: 28 },
  { id: 'INV-I-008', name: 'Safety vests', category: 'PPE', quantity: 4, unit: 'ea', reorderLevel: 3, lastRestocked: '2026-06-01', costPerUnit: 8 },
]

export const documents: Document[] = [
  { id: 'DOC-001', name: 'General Liability Certificate', type: 'certificate', clientId: null, clientName: null, jobId: null, uploadedAt: '2026-01-15', size: '245 KB', status: 'active' },
  { id: 'DOC-002', name: 'Workers Comp Policy', type: 'certificate', clientId: null, clientName: null, jobId: null, uploadedAt: '2026-01-15', size: '312 KB', status: 'active' },
  { id: 'DOC-003', name: 'Vehicle Insurance - Truck 1', type: 'certificate', clientId: null, clientName: null, jobId: null, uploadedAt: '2026-02-01', size: '198 KB', status: 'active' },
  { id: 'DOC-004', name: 'COI - Pacific Property Mgmt', type: 'certificate', clientId: 'CL-006', clientName: 'Pacific Property Mgmt', jobId: null, uploadedAt: '2026-03-10', size: '156 KB', status: 'active' },
  { id: 'DOC-005', name: 'Release of Liability - Template', type: 'waiver', clientId: null, clientName: null, jobId: null, uploadedAt: '2026-01-20', size: '89 KB', status: 'active' },
  { id: 'DOC-006', name: 'Signed Waiver - Robert Akana', type: 'waiver', clientId: 'CL-007', clientName: 'Robert Akana', jobId: 'JOB-005', uploadedAt: '2026-09-19', size: '102 KB', status: 'signed' },
  { id: 'DOC-007', name: 'Dump Receipt - PVT Land 09/18', type: 'receipt', clientId: null, clientName: null, jobId: 'JOB-006', uploadedAt: '2026-09-18', size: '45 KB', status: 'active' },
  { id: 'DOC-008', name: 'Service Contract - Aloha Construction', type: 'contract', clientId: 'CL-008', clientName: 'Aloha Construction LLC', jobId: null, uploadedAt: '2026-04-01', size: '234 KB', status: 'signed' },
  { id: 'DOC-009', name: 'OSHA-10 Cert - Kai Nakamura', type: 'certificate', clientId: null, clientName: null, jobId: null, uploadedAt: '2026-06-15', size: '178 KB', status: 'active' },
  { id: 'DOC-010', name: 'Donation Receipt - Goodwill 09/20', type: 'receipt', clientId: null, clientName: null, jobId: 'JOB-004', uploadedAt: '2026-09-20', size: '38 KB', status: 'active' },
]

// Dashboard aggregates
export const dashboardStats = {
  todayJobs: 3,
  todayRevenue: 1200,
  weekRevenue: 4850,
  monthRevenue: 12450,
  openRequests: 4,
  pendingQuotes: 3,
  overdueInvoices: 2,
  overdueAmount: 1030,
  avgJobValue: 415,
  completionRate: 94,
  truckUtilization: 72,
  diversionRate: 67,
}

export const recentActivity = [
  { time: '9:45 AM', text: 'Change order approved - Maria Santos (+$75)', type: 'success' },
  { time: '9:30 AM', text: 'Crew arrived at 94-480 Ukee St (JOB-002)', type: 'info' },
  { time: '9:15 AM', text: 'Quote QT-001 sent to Sarah Kealoha', type: 'info' },
  { time: '9:00 AM', text: 'Kai & Joe clocked in for JOB-001', type: 'info' },
  { time: '8:15 AM', text: 'New request from Sarah Kealoha (REQ-001)', type: 'new' },
  { time: '7:45 AM', text: 'New request from Derek Watanabe (REQ-006)', type: 'new' },
  { time: 'Yesterday', text: 'Invoice INV-001 paid by Pacific Property Mgmt ($425)', type: 'success' },
  { time: 'Yesterday', text: 'Job JOB-004 completed - Pacific Property Mgmt', type: 'success' },
  { time: 'Sep 19', text: 'Job JOB-005 completed - Robert Akana ($250)', type: 'success' },
  { time: 'Sep 18', text: 'Job JOB-006 completed - Aloha Construction ($750)', type: 'success' },
]

// Color helpers
export const statusColors: Record<string, string> = {
  new: 'badge-blue',
  contacted: 'badge-yellow',
  quoted: 'badge-orange',
  booked: 'badge-green',
  lost: 'badge-gray',
  draft: 'badge-gray',
  sent: 'badge-blue',
  viewed: 'badge-yellow',
  approved: 'badge-green',
  declined: 'badge-red',
  expired: 'badge-gray',
  scheduled: 'badge-blue',
  en_route: 'badge-yellow',
  in_progress: 'badge-orange',
  completed: 'badge-green',
  cancelled: 'badge-gray',
  due: 'badge-yellow',
  overdue: 'badge-red',
  paid: 'badge-green',
  available: 'badge-green',
  on_job: 'badge-orange',
  off_duty: 'badge-gray',
  break: 'badge-yellow',
  active: 'badge-green',
  signed: 'badge-green',
  pending: 'badge-yellow',
}

export const crewColors = ['#16a34a', '#2563eb', '#d97706', '#7c3aed', '#dc2626']

export function formatCurrency(amount: number): string {
  return '$' + amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return '-'
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
