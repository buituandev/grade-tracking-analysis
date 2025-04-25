// Personal Dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize after improveUI.js has done its work
    setTimeout(initializePersonalDashboard, 2000);
});

function initializePersonalDashboard() {
    // Check if the main dashboard tabs are already created by improveUI.js
    if (!document.getElementById('mainTabs')) {
        console.log("Waiting for main UI to load before initializing personal dashboard...");
        setTimeout(initializePersonalDashboard, 1000);
        return;
    }

    // Add Personal tab to the existing tabs
    addPersonalTab();
    
    // Setup event handlers and localStorage management
    setupPersonalTabHandlers();
}

function addPersonalTab() {
    // Add tab to the navigation
    const tabsNav = document.getElementById('mainTabs');
    const personalTabHTML = `
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="personal-tab" data-bs-toggle="tab" data-bs-target="#personalTab" 
                type="button" role="tab" aria-controls="personalTab" aria-selected="false">
                <i class="bi bi-person-badge me-2"></i>Personal
            </button>
        </li>
    `;
    tabsNav.insertAdjacentHTML('beforeend', personalTabHTML);

    // Add tab content
    const tabsContent = document.getElementById('mainTabsContent');
    const personalTabContentHTML = `
        <div class="tab-pane fade" id="personalTab" role="tabpanel" aria-labelledby="personal-tab">
            <div class="personal-dashboard">
                <div class="dashboard-card">
                    <h3 class="text-primary mb-4"><i class="bi bi-person-circle me-2"></i>My Progress Dashboard</h3>
                    
                    <div class="row mb-4">
                        <div class="col-md-6">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="mySpojId" placeholder="Your Spoj ID">
                                <label for="mySpojId">Your Spoj ID</label>
                            </div>
                        </div>
                        <div class="col-md-6 d-flex align-items-end">
                            <button class="btn btn-primary me-2" id="saveSpojId">
                                <i class="bi bi-save me-2"></i>Save & Analyze
                            </button>
                            <button class="btn btn-outline-secondary" id="clearSpojId">
                                <i class="bi bi-x-circle me-2"></i>Clear
                            </button>
                        </div>
                    </div>
                    
                    <div id="personalAnalysis" class="mt-4" style="display: none;">
                        <div class="row mb-4">
                            <div class="col-lg-4 col-md-6 col-12 mb-3 mb-lg-0">
                                <div class="stat-card personal-stat">
                                    <h5>My Rank</h5>
                                    <div class="stat-number" id="myRank">-</div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6 col-12 mb-3 mb-lg-0">
                                <div class="stat-card personal-stat">
                                    <h5>My Score</h5>
                                    <div class="stat-number" id="myScore">-</div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6 col-12">
                                <div class="stat-card personal-stat">
                                    <h5>Problems Solved</h5>
                                    <div class="stat-number" id="mySolvedCount">-</div>
                                </div>
                            </div>
                        </div>

                        <div class="analysis-tabs">
                            <ul class="nav nav-pills mb-4 flex-nowrap overflow-auto personal-tab-nav" id="personalAnalysisTabs" role="tablist">
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link active" id="todo-tab" data-bs-toggle="pill" 
                                        data-bs-target="#todoTab" type="button" role="tab">
                                        <i class="bi bi-check-circle me-2"></i>Action Items
                                    </button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="progress-tab" data-bs-toggle="pill" 
                                        data-bs-target="#progressTab" type="button" role="tab">
                                        <i class="bi bi-graph-up me-2"></i>My Progress
                                    </button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="compare-tab" data-bs-toggle="pill" 
                                        data-bs-target="#compareTab" type="button" role="tab">
                                        <i class="bi bi-people me-2"></i>Compare
                                    </button>
                                </li>
                            </ul>

                            <div class="tab-content" id="personalAnalysisTabContent">
                                <!-- Action Items Tab -->
                                <div class="tab-pane fade show active" id="todoTab" role="tabpanel">
                                    <div class="dashboard-card priority-alerts mb-4" style="background-color: #fff3cd; border-left: 5px solid #ffc107;">
                                        <h5 class="text-warning"><i class="bi bi-exclamation-triangle-fill me-2"></i>Urgent Action Items</h5>
                                        <div id="deadlinePriority" class="mb-3">
                                            <div class="alert alert-warning">Looking for urgent problems...</div>
                                        </div>
                                    </div>
                                
                                    <div class="row">
                                        <div class="col-lg-6 col-12 mb-4">
                                            <div class="dashboard-card unsolved-problems" style="border-left: 5px solid #dc3545;">
                                                <h5 class="text-danger"><i class="bi bi-x-circle me-2"></i>Unsolved Problems</h5>
                                                <div id="unsolvedProblems">
                                                    <div class="alert alert-light">Looking for unsolved problems...</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-6 col-12 mb-4">
                                            <div class="dashboard-card improvement-needed" style="border-left: 5px solid #fd7e14;">
                                                <h5 class="text-warning"><i class="bi bi-lightning me-2"></i>Need Improvement</h5>
                                                <div id="improvementNeeded">
                                                    <div class="alert alert-light">Looking for problems to improve...</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="dashboard-card recommendation mb-4" style="border-left: 5px solid #0dcaf0;">
                                        <h5 class="text-info"><i class="bi bi-award me-2"></i>Recommended Problems</h5>
                                        <div id="recommendedProblems">
                                            <div class="alert alert-light">Generating recommendations...</div>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Progress Tab -->
                                <div class="tab-pane fade" id="progressTab" role="tabpanel">
                                    <div class="row">
                                        <div class="col-lg-6 col-12 mb-4">
                                            <div class="dashboard-card">
                                                <h5 class="mb-3 text-center">My Progress</h5>
                                                <div class="chart-container">
                                                    <canvas id="myProgressChart"></canvas>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-6 col-12 mb-4">
                                            <div class="dashboard-card">
                                                <h5 class="mb-3 text-center">My Score Distribution</h5>
                                                <div class="chart-container">
                                                    <canvas id="myScoreDistributionChart"></canvas>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="dashboard-card mt-4">
                                        <h5 class="mb-3">My Problem Status</h5>
                                        <div class="table-responsive">
                                            <table class="table table-hover" id="myProblemsTable">
                                                <thead>
                                                    <tr>
                                                        <th>Problem</th>
                                                        <th>Status</th>
                                                        <th>My Score</th>
                                                        <th>Deadline</th>
                                                        <th>Class Avg</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <!-- Will be filled dynamically -->
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Compare Tab -->
                                <div class="tab-pane fade" id="compareTab" role="tabpanel">
                                    <div class="dashboard-card mb-4">
                                        <h5 class="mb-3">Compare with Others</h5>
                                        <div class="row mb-4">
                                            <div class="col-lg-8 col-md-6 col-12 mb-3 mb-lg-0">
                                                <div class="form-floating">
                                                    <input type="text" class="form-control" id="compareSpojId" placeholder="Other Spoj ID">
                                                    <label for="compareSpojId">Other Spoj ID</label>
                                                </div>
                                            </div>
                                            <div class="col-lg-4 col-md-6 col-12 d-flex align-items-end">
                                                <button class="btn btn-success w-100" id="compareButton">
                                                    <i class="bi bi-arrow-left-right me-2"></i>Compare
                                                </button>
                                            </div>
                                        </div>
                                        
                                        <div id="comparisonResults" style="display: none;">
                                            <div class="row">
                                                <div class="col-lg-6 col-12 mb-4">
                                                    <div class="dashboard-card">
                                                        <h5 class="mb-3 text-center">Score Comparison</h5>
                                                        <div class="chart-container">
                                                            <canvas id="comparisonChart"></canvas>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6 col-12 mb-4">
                                                    <div class="dashboard-card">
                                                        <h5 class="mb-3 text-center">Category Comparison</h5>
                                                        <div class="chart-container">
                                                            <canvas id="categoryComparisonChart"></canvas>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div class="alert alert-success mb-4" id="competitorAdvantage" style="display: none;">
                                                <h5 class="alert-heading"><i class="bi bi-trophy me-2"></i>Competitor's Edge</h5>
                                                <p class="mb-0">These are problems your competitor has solved but you haven't:</p>
                                                <div id="competitorAdvantageList" class="mt-2"></div>
                                            </div>
                                            
                                            <div class="alert alert-primary mb-4" id="yourAdvantage" style="display: none;">
                                                <h5 class="alert-heading"><i class="bi bi-award me-2"></i>Your Edge</h5>
                                                <p class="mb-0">These are problems you've solved but your competitor hasn't:</p>
                                                <div id="yourAdvantageList" class="mt-2"></div>
                                            </div>
                                            
                                            <div class="dashboard-card">
                                                <h5 class="mb-3">Detailed Comparison</h5>
                                                <div class="table-responsive">
                                                    <table class="table table-hover" id="comparisonTable">
                                                        <thead>
                                                            <tr>
                                                                <th>Problem</th>
                                                                <th>Your Score</th>
                                                                <th>Their Score</th>
                                                                <th>Difference</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <!-- Will be filled dynamically -->
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    tabsContent.insertAdjacentHTML('beforeend', personalTabContentHTML);

    // Add additional styles
    const additionalStyles = `
        <style id="personal-tab-styles">
            /* Responsive styles for all screen sizes */
            @media (max-width: 768px) {
                .container-fluid, .main-container {
                    padding: 10px !important;
                }

                h1 {
                    font-size: 1.75rem !important;
                    margin-bottom: 0.75rem !important;
                }

                .dashboard-card {
                    padding: 15px !important;
                    margin-bottom: 15px !important;
                }

                .stat-card {
                    padding: 10px !important;
                }

                .stat-number {
                    font-size: 20px !important;
                }

                .table-responsive {
                    overflow-x: auto;
                    -webkit-overflow-scrolling: touch;
                }

                /* Properly scale down charts on mobile */
                .chart-container {
                    height: 250px !important;
                }

                /* Make tabs scroll horizontally on mobile */
                #mainTabs {
                    flex-wrap: nowrap !important;
                    overflow-x: auto !important;
                    scrollbar-width: none !important; /* Firefox */
                    -ms-overflow-style: none !important; /* IE and Edge */
                }

                #mainTabs::-webkit-scrollbar {
                    display: none !important; /* Chrome, Safari, Opera */
                }

                /* Smaller padding for tab buttons on mobile */
                .nav-tabs .nav-link, .nav-pills .nav-link {
                    padding: 0.5rem 0.75rem !important;
                    font-size: 0.875rem !important;
                }

                /* Ensure tab content is properly spaced */
                .tab-content {
                    padding: 10px 0 !important;
                }

                /* Ensure buttons are properly sized for touch on mobile */
                .btn {
                    padding: 0.375rem 0.75rem !important;
                    font-size: 0.875rem !important;
                    min-height: 40px !important; /* Better touch targets */
                }

                /* Button spacing in card footers */
                .card-footer .btn {
                    margin: 0.25rem !important;
                }
            }

            /* Specific mobile styles for the personal tab */
            @media (max-width: 576px) {
                .personal-tab-nav {
                    padding-bottom: 5px !important;
                }

                .personal-tab-nav .nav-link {
                    padding: 0.5rem 0.75rem !important;
                    font-size: 0.8rem !important;
                    margin-right: 0.25rem !important;
                }

                .personal-tab-nav .nav-link i {
                    margin-right: 0.25rem !important;
                }

                .problem-item {
                    flex-direction: column !important;
                    align-items: flex-start !important;
                }

                .problem-item > div:last-child {
                    margin-top: 0.5rem !important;
                    width: 100% !important;
                    display: flex !important;
                    justify-content: space-between !important;
                }

                .competitor-advantage {
                    padding: 0.75rem !important;
                }

                .competitor-advantage .d-flex {
                    flex-direction: column !important;
                    align-items: flex-start !important;
                }

                .competitor-advantage .btn {
                    margin-top: 0.5rem !important;
                    width: 100% !important;
                }
            }

            /* Base personal tab styles */
            .personal-stat {
                background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
                color: white;
                transition: all 0.3s ease;
            }
            .personal-stat:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 20px rgba(0,0,0,0.15);
            }
            .personal-stat .stat-number {
                color: white;
                font-size: 28px;
                font-weight: 700;
            }
            .personal-stat h5 {
                opacity: 0.9;
            }
            
            .nav-pills .nav-link {
                border-radius: 50rem;
                padding: 0.5rem 1.5rem;
                margin-right: 0.5rem;
                transition: all 0.2s ease;
            }
            .nav-pills .nav-link.active {
                background-color: #0d6efd;
                box-shadow: 0 4px 8px rgba(13, 110, 253, 0.25);
                transform: translateY(-1px);
            }
            
            #todoTab .dashboard-card {
                transition: all 0.3s ease;
                border-radius: 12px;
                overflow: hidden;
            }
            #todoTab .dashboard-card:hover {
                box-shadow: 0 8px 16px rgba(0,0,0,0.1);
                transform: translateY(-2px);
            }
            
            .priority-item {
                background: rgba(255, 193, 7, 0.1);
                border-left: 4px solid #ffc107;
                padding: 1rem;
                margin-bottom: 0.5rem;
                border-radius: 4px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                transition: all 0.2s ease;
            }
            .priority-item:hover {
                background: rgba(255, 193, 7, 0.2);
                transform: translateX(5px);
            }
            .priority-item .deadline {
                color: #dc3545;
                font-weight: bold;
                animation: pulse 2s infinite;
            }
            @keyframes pulse {
                0% { opacity: 1; }
                50% { opacity: 0.5; }
                100% { opacity: 1; }
            }
            
            .problem-item {
                padding: 0.8rem;
                margin-bottom: 0.5rem;
                border-radius: 4px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                transition: all 0.2s ease;
            }
            .problem-item:hover {
                transform: translateX(5px);
            }
            .problem-item .problem-link {
                font-weight: 500;
                text-decoration: none;
            }
            .problem-item .problem-link:hover {
                text-decoration: underline;
            }
            
            .unsolved-item {
                background: rgba(220, 53, 69, 0.1);
                border-left: 4px solid #dc3545;
            }
            .unsolved-item:hover {
                background: rgba(220, 53, 69, 0.2);
            }
            
            .improve-item {
                background: rgba(253, 126, 20, 0.1);
                border-left: 4px solid #fd7e14;
            }
            .improve-item:hover {
                background: rgba(253, 126, 20, 0.2);
            }
            
            .recommended-item {
                background: rgba(13, 202, 240, 0.1);
                border-left: 4px solid #0dcaf0;
            }
            .recommended-item:hover {
                background: rgba(13, 202, 240, 0.2);
            }
            
            .competitor-advantage {
                background-color: #fff3cd;
                border-left: 4px solid #ffc107;
                padding: 1rem;
                margin-bottom: 0.5rem;
                border-radius: 4px;
                animation: highlight 2s infinite;
            }
            
            @keyframes highlight {
                0% { box-shadow: 0 0 0 rgba(255, 193, 7, 0); }
                50% { box-shadow: 0 0 10px rgba(255, 193, 7, 0.5); }
                100% { box-shadow: 0 0 0 rgba(255, 193, 7, 0); }
            }
            
            .competitor-advantage .btn-warning {
                animation: buttonPulse 1.5s infinite;
            }
            
            @keyframes buttonPulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
            
            .status-unsolved {
                color: #dc3545;
                font-weight: bold;
            }
            
            .status-solved {
                color: #198754;
                font-weight: bold;
            }
            
            .status-partial {
                color: #fd7e14;
                font-weight: bold;
            }
            
            .advantage-badge {
                display: inline-block;
                padding: 0.35rem 0.5rem;
                font-size: 0.75rem;
                font-weight: 700;
                line-height: 1;
                text-align: center;
                white-space: nowrap;
                vertical-align: baseline;
                border-radius: 0.25rem;
                background-color: #dc3545;
                color: white;
                margin-left: 0.5rem;
            }

            /* Horizontal scroll for tabs */
            .personal-tab-nav {
                flex-wrap: nowrap;
                overflow-x: auto;
                scrollbar-width: none; /* Firefox */
                -ms-overflow-style: none; /* IE and Edge */
            }

            .personal-tab-nav::-webkit-scrollbar {
                display: none; /* Chrome, Safari, Opera */
            }

            /* Make chart containers responsive */
            .chart-container {
                min-height: 300px;
                width: 100%;
                position: relative;
            }
        </style>
    `;
    document.head.insertAdjacentHTML('beforeend', additionalStyles);
}

function setupPersonalTabHandlers() {
    // Load saved Spoj ID from localStorage
    const savedSpojId = localStorage.getItem('mySpojId');
    if (savedSpojId) {
        document.getElementById('mySpojId').value = savedSpojId;
        analyzePersonalData(savedSpojId);
    }

    // Save Spoj ID button
    document.getElementById('saveSpojId').addEventListener('click', function() {
        const spojId = document.getElementById('mySpojId').value.trim();
        if (spojId) {
            localStorage.setItem('mySpojId', spojId);
            analyzePersonalData(spojId);
        } else {
            alert('Please enter your Spoj ID');
        }
    });

    // Clear Spoj ID button
    document.getElementById('clearSpojId').addEventListener('click', function() {
        localStorage.removeItem('mySpojId');
        document.getElementById('mySpojId').value = '';
        document.getElementById('personalAnalysis').style.display = 'none';
    });

    // Compare button
    document.getElementById('compareButton').addEventListener('click', function() {
        const mySpojId = document.getElementById('mySpojId').value.trim();
        const compareSpojId = document.getElementById('compareSpojId').value.trim();
        
        if (!mySpojId) {
            alert('Please enter your Spoj ID first');
            return;
        }
        
        if (!compareSpojId) {
            alert('Please enter a Spoj ID to compare with');
            return;
        }
        
        compareStudents(mySpojId, compareSpojId);
    });

    // Setup tab switching (for browsers without Bootstrap JS)
    setupTabHandling('#personalAnalysisTabs', '#personalAnalysisTabContent');
}

// Analyze personal data
function analyzePersonalData(spojId) {
    // Show the analysis section
    document.getElementById('personalAnalysis').style.display = 'block';
    
    // Find student data
    const student = findStudentBySpojId(spojId);
    
    if (!student) {
        alert('Student not found with this Spoj ID. Please check and try again.');
        return;
    }
    
    // Update stats
    updatePersonalStats(student);
    
    // Generate action items
    generateActionItems(student);
    
    // Update progress charts
    updateProgressCharts(student);
    
    // Update problems table
    updateProblemsTable(student);
}

// Find student by Spoj ID
function findStudentBySpojId(spojId) {
    // Access the global students array from rank.html
    if (!window.students) {
        console.error('Students data not available');
        return null;
    }
    
    return window.students.find(student => student.id === spojId);
}

// Update personal stats
function updatePersonalStats(student) {
    // Calculate rank
    const rank = calculateRank(student);
    document.getElementById('myRank').textContent = rank;
    
    // Set score
    document.getElementById('myScore').textContent = student.grades && student.grades[0] && student.grades[0].score !== null 
        ? student.grades[0].score 
        : '0';
    
    // Count solved problems
    const solvedCount = countSolvedProblems(student);
    document.getElementById('mySolvedCount').textContent = solvedCount;
}

// Calculate rank
function calculateRank(student) {
    if (!window.students) return '-';
    
    const score = student.grades && student.grades[0] && student.grades[0].score !== null 
        ? student.grades[0].score 
        : 0;
        
    // Count students with higher scores
    let higherScores = 0;
    window.students.forEach(s => {
        const otherScore = s.grades && s.grades[0] && s.grades[0].score !== null 
            ? s.grades[0].score 
            : 0;
            
        if (otherScore > score) {
            higherScores++;
        }
    });
    
    return higherScores + 1;
}

// Count solved problems
function countSolvedProblems(student) {
    if (!student.grades) return 0;
    
    let count = 0;
    // Start from index 1 to skip the overall grade
    for (let i = 1; i < student.grades.length - 1; i++) {
        if (student.grades[i] && student.grades[i].score > 0) {
            count++;
        }
    }
    
    return count;
}

// Generate action items
function generateActionItems(student) {
    if (!window.problems) {
        console.error('Problems data not available');
        return;
    }
    
    const now = new Date();
    const deadlineProblems = [];
    const unsolvedProblems = [];
    const improvementProblems = [];
    
    // Process each problem
    for (let i = 0; i < window.problems.length; i++) {
        const problem = window.problems[i];
        const studentGrade = student.grades[i + 1]; // +1 to skip the overall grade
        
        const score = studentGrade && studentGrade.score !== null ? studentGrade.score : 0;
        const problemData = {
            id: problem.problemId,
            deadline: problem.deadLine,
            score: score,
            link: `http://www.spoj.com/EIUPROGR/problems/${problem.problemId}`
        };
        
        // Check deadline proximity (within 7 days)
        const daysUntilDeadline = Math.ceil((problem.deadLine - now) / (1000 * 60 * 60 * 24));
        
        if (daysUntilDeadline > 0 && daysUntilDeadline <= 7 && score < 100) {
            deadlineProblems.push({
                ...problemData,
                daysLeft: daysUntilDeadline
            });
        }
        
        // Unsolved problems
        if (score === 0) {
            unsolvedProblems.push(problemData);
        }
        
        // Problems that need improvement
        if (score > 0 && score < 100) {
            improvementProblems.push(problemData);
        }
    }
    
    // Sort deadline problems by urgency
    deadlineProblems.sort((a, b) => a.daysLeft - b.daysLeft);
    
    // Update the UI
    updateDeadlinePriority(deadlineProblems);
    updateUnsolvedProblems(unsolvedProblems);
    updateImprovementNeeded(improvementProblems);
    updateRecommendedProblems(student);
}

// Update deadline priority section
function updateDeadlinePriority(deadlineProblems) {
    const container = document.getElementById('deadlinePriority');
    
    if (deadlineProblems.length === 0) {
        container.innerHTML = `
            <div class="alert alert-success">
                <i class="bi bi-check-circle-fill me-2"></i>No urgent deadlines. Good job!
            </div>
        `;
        return;
    }
    
    let html = '';
    deadlineProblems.forEach(problem => {
        html += `
            <div class="priority-item">
                <div>
                    <a href="${problem.link}" target="_blank" class="problem-link">
                        <strong>${problem.id}</strong>
                    </a>
                    <span class="ms-2 badge ${problem.score === 0 ? 'bg-danger' : 'bg-warning'}">
                        ${problem.score === 0 ? 'Not Started' : problem.score + '%'}
                    </span>
                </div>
                <div class="deadline">
                    <i class="bi bi-alarm"></i> ${problem.daysLeft} day${problem.daysLeft !== 1 ? 's' : ''} left!
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Update unsolved problems section
function updateUnsolvedProblems(unsolvedProblems) {
    const container = document.getElementById('unsolvedProblems');
    
    if (unsolvedProblems.length === 0) {
        container.innerHTML = `
            <div class="alert alert-success">
                <i class="bi bi-check-circle-fill me-2"></i>You've started all problems!
            </div>
        `;
        return;
    }
    
    let html = '';
    unsolvedProblems.slice(0, 5).forEach(problem => {
        const deadlineDate = problem.deadline.toLocaleDateString();
        html += `
            <div class="problem-item unsolved-item">
                <div>
                    <a href="${problem.link}" target="_blank" class="problem-link">
                        ${problem.id}
                    </a>
                </div>
                <div>
                    <span class="text-muted small">Due: ${deadlineDate}</span>
                    <a href="${problem.link}" target="_blank" class="btn btn-sm btn-outline-danger ms-2">Start</a>
                </div>
            </div>
        `;
    });
    
    if (unsolvedProblems.length > 5) {
        html += `<div class="text-center mt-2"><small class="text-muted">+ ${unsolvedProblems.length - 5} more</small></div>`;
    }
    
    container.innerHTML = html;
}

// Update improvement needed section
function updateImprovementNeeded(improvementProblems) {
    const container = document.getElementById('improvementNeeded');
    
    if (improvementProblems.length === 0) {
        container.innerHTML = `
            <div class="alert alert-success">
                <i class="bi bi-check-circle-fill me-2"></i>All your started problems are at 100%!
            </div>
        `;
        return;
    }
    
    // Sort by score (ascending)
    improvementProblems.sort((a, b) => a.score - b.score);
    
    let html = '';
    improvementProblems.slice(0, 5).forEach(problem => {
        html += `
            <div class="problem-item improve-item">
                <div>
                    <a href="${problem.link}" target="_blank" class="problem-link">
                        ${problem.id}
                    </a>
                </div>
                <div>
                    <span class="badge bg-warning">${problem.score}%</span>
                    <a href="${problem.link}" target="_blank" class="btn btn-sm btn-outline-warning ms-2">Improve</a>
                </div>
            </div>
        `;
    });
    
    if (improvementProblems.length > 5) {
        html += `<div class="text-center mt-2"><small class="text-muted">+ ${improvementProblems.length - 5} more</small></div>`;
    }
    
    container.innerHTML = html;
}

// Update recommended problems section
function updateRecommendedProblems(student) {
    const container = document.getElementById('recommendedProblems');
    
    if (!window.problems || !window.students) {
        container.innerHTML = `<div class="alert alert-warning">Cannot generate recommendations at this time.</div>`;
        return;
    }
    
    // Get all problems with class statistics
    const problemStats = [];
    
    for (let i = 0; i < window.problems.length; i++) {
        const problem = window.problems[i];
        
        // Get student's score
        const studentGrade = student.grades[i + 1]; // +1 to skip overall grade
        const myScore = studentGrade && studentGrade.score !== null ? studentGrade.score : 0;
        
        // Skip if already solved with 100%
        if (myScore === 100) continue;
        
        // Calculate class statistics for this problem
        let totalScore = 0;
        let totalStudents = 0;
        let solvedCount = 0;
        
        window.students.forEach(s => {
            if (s.grades && s.grades[i + 1] && s.grades[i + 1].score !== null) {
                totalScore += s.grades[i + 1].score;
                totalStudents++;
                
                if (s.grades[i + 1].score === 100) {
                    solvedCount++;
                }
            }
        });
        
        const averageScore = totalStudents > 0 ? totalScore / totalStudents : 0;
        const solveRate = totalStudents > 0 ? solvedCount / totalStudents : 0;
        
        // Calculate recommendation score (higher means more recommended)
        // Factors: high solve rate, high class average, low student score
        const recommendScore = (solveRate * 0.7 + averageScore / 100 * 0.3) * (100 - myScore) / 100;
        
        problemStats.push({
            id: problem.problemId,
            link: `http://www.spoj.com/EIUPROGR/problems/${problem.problemId}`,
            myScore: myScore,
            avgScore: averageScore,
            solveRate: solveRate,
            recommendScore: recommendScore
        });
    }
    
    // Sort by recommendation score (descending)
    problemStats.sort((a, b) => b.recommendScore - a.recommendScore);
    
    // Take top 5 recommendations
    const recommendations = problemStats.slice(0, 5);
    
    if (recommendations.length === 0) {
        container.innerHTML = `
            <div class="alert alert-success">
                <i class="bi bi-check-circle-fill me-2"></i>You've completed all problems with 100% score!
            </div>
        `;
        return;
    }
    
    let html = '';
    recommendations.forEach(problem => {
        const solveRatePercent = Math.round(problem.solveRate * 100);
        const avgScoreRounded = Math.round(problem.avgScore);
        
        html += `
            <div class="problem-item recommended-item">
                <div>
                    <a href="${problem.link}" target="_blank" class="problem-link">
                        ${problem.id}
                    </a>
                    ${problem.myScore === 0 ? 
                        `<span class="badge bg-danger ms-2">Not Started</span>` : 
                        `<span class="badge bg-warning ms-2">${problem.myScore}%</span>`
                    }
                </div>
                <div>
                    <span class="text-muted small">${solveRatePercent}% of class solved | Avg: ${avgScoreRounded}%</span>
                    <a href="${problem.link}" target="_blank" class="btn btn-sm btn-outline-info ms-2">
                        ${problem.myScore === 0 ? 'Start' : 'Continue'}
                    </a>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Update progress charts
function updateProgressCharts(student) {
    if (!window.Chart) {
        console.warn('Chart.js not available. Charts will not be displayed.');
        return;
    }
    
    updateProgressLineChart(student);
    updateScoreDistributionChart(student);
}

// Update progress line chart
function updateProgressLineChart(student) {
    const ctx = document.getElementById('myProgressChart').getContext('2d');
    
    // Destroy existing chart if it exists
    if (window.myProgressChartInstance) {
        window.myProgressChartInstance.destroy();
    }
    
    // Prepare data
    const labels = [];
    const scores = [];
    
    // Start from index 1 to skip the overall grade, and exclude the last item (AC/Total)
    for (let i = 1; i < student.grades.length - 1; i++) {
        const problem = window.problems[i - 1];
        labels.push(problem.problemId);
        
        const score = student.grades[i] && student.grades[i].score !== null ? student.grades[i].score : 0;
        scores.push(score);
    }
    
    // Create chart
    window.myProgressChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'My Score',
                data: scores,
                backgroundColor: 'rgba(13, 110, 253, 0.2)',
                borderColor: 'rgba(13, 110, 253, 1)',
                borderWidth: 2,
                fill: true,
                tension: 0.1,
                pointBackgroundColor: 'rgba(13, 110, 253, 1)',
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Score'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Problems'
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Score: ${context.raw}%`;
                        }
                    }
                }
            }
        }
    });
}

// Update score distribution chart
function updateScoreDistributionChart(student) {
    const ctx = document.getElementById('myScoreDistributionChart').getContext('2d');
    
    // Destroy existing chart if it exists
    if (window.myScoreDistChartInstance) {
        window.myScoreDistChartInstance.destroy();
    }
    
    // Count problems in each category
    const scoreCategories = {
        perfect: 0,  // 100%
        good: 0,     // 70-99%
        average: 0,  // 40-69%
        low: 0,      // 1-39%
        unsolved: 0  // 0%
    };
    
    // Start from index 1 to skip the overall grade, and exclude the last item (AC/Total)
    for (let i = 1; i < student.grades.length - 1; i++) {
        const score = student.grades[i] && student.grades[i].score !== null ? student.grades[i].score : 0;
        
        if (score === 100) {
            scoreCategories.perfect++;
        } else if (score >= 70) {
            scoreCategories.good++;
        } else if (score >= 40) {
            scoreCategories.average++;
        } else if (score > 0) {
            scoreCategories.low++;
        } else {
            scoreCategories.unsolved++;
        }
    }
    
    // Create chart
    window.myScoreDistChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Perfect (100%)', 'Good (70-99%)', 'Average (40-69%)', 'Low (1-39%)', 'Unsolved (0%)'],
            datasets: [{
                data: [
                    scoreCategories.perfect,
                    scoreCategories.good,
                    scoreCategories.average,
                    scoreCategories.low,
                    scoreCategories.unsolved
                ],
                backgroundColor: [
                    'rgba(25, 135, 84, 0.8)',   // Perfect - green
                    'rgba(13, 202, 240, 0.8)',  // Good - cyan
                    'rgba(255, 193, 7, 0.8)',   // Average - yellow
                    'rgba(253, 126, 20, 0.8)',  // Low - orange
                    'rgba(220, 53, 69, 0.8)'    // Unsolved - red
                ],
                borderColor: [
                    'rgba(25, 135, 84, 1)',
                    'rgba(13, 202, 240, 1)',
                    'rgba(255, 193, 7, 1)',
                    'rgba(253, 126, 20, 1)',
                    'rgba(220, 53, 69, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Update problems table
function updateProblemsTable(student) {
    const tableBody = document.getElementById('myProblemsTable').querySelector('tbody');
    tableBody.innerHTML = '';
    
    // Check if problems data is available
    if (!window.problems) {
        tableBody.innerHTML = '<tr><td colspan="6" class="text-center">Problem data not available</td></tr>';
        return;
    }
    
    // Add rows for each problem
    for (let i = 0; i < window.problems.length; i++) {
        const problem = window.problems[i];
        const studentGrade = student.grades[i + 1]; // +1 to skip the overall grade
        const score = studentGrade && studentGrade.score !== null ? studentGrade.score : 0;
        
        // Calculate class average
        let totalScore = 0;
        let totalStudents = 0;
        window.students.forEach(s => {
            if (s.grades && s.grades[i + 1] && s.grades[i + 1].score !== null) {
                totalScore += s.grades[i + 1].score;
                totalStudents++;
            }
        });
        const avgScore = totalStudents > 0 ? Math.round(totalScore / totalStudents) : 0;
        
        // Determine status
        let status = '';
        let statusClass = '';
        
        if (score === 0) {
            status = 'Not Started';
            statusClass = 'status-unsolved';
        } else if (score === 100) {
            status = 'Completed';
            statusClass = 'status-solved';
        } else {
            status = 'In Progress';
            statusClass = 'status-partial';
        }
        
        // Format deadline
        const deadlineDate = problem.deadLine.toLocaleDateString();
        const now = new Date();
        const daysUntilDeadline = Math.ceil((problem.deadLine - now) / (1000 * 60 * 60 * 24));
        
        let deadlineHtml = '';
        if (daysUntilDeadline <= 0) {
            deadlineHtml = `<span class="text-muted">${deadlineDate} (Passed)</span>`;
        } else if (daysUntilDeadline <= 7) {
            deadlineHtml = `<span class="text-danger"><strong>${deadlineDate} (${daysUntilDeadline} days left!)</strong></span>`;
        } else {
            deadlineHtml = `<span>${deadlineDate} (${daysUntilDeadline} days left)</span>`;
        }
        
        // Create row
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <a href="http://www.spoj.com/EIUPROGR/problems/${problem.problemId}" target="_blank">
                    ${problem.problemId}
                </a>
            </td>
            <td class="${statusClass}">${status}</td>
            <td>
                <div class="progress" style="height: 20px;">
                    <div class="progress-bar ${getProgressBarClass(score)}" role="progressbar" 
                        style="width: ${score}%" aria-valuenow="${score}" aria-valuemin="0" 
                        aria-valuemax="100">${score}%</div>
                </div>
            </td>
            <td>${deadlineHtml}</td>
            <td>${avgScore}%</td>
            <td>
                <a href="http://www.spoj.com/EIUPROGR/problems/${problem.problemId}" 
                   target="_blank" class="btn btn-sm ${getActionButtonClass(score)}">
                    ${getActionButtonText(score)}
                </a>
            </td>
        `;
        
        tableBody.appendChild(row);
    }
}

// Helper functions for formatting table elements
function getProgressBarClass(score) {
    if (score === 100) return 'bg-success';
    if (score >= 70) return 'bg-info';
    if (score >= 40) return 'bg-warning';
    if (score > 0) return 'bg-danger';
    return 'bg-secondary';
}

function getActionButtonClass(score) {
    if (score === 0) return 'btn-outline-danger';
    if (score === 100) return 'btn-outline-success';
    return 'btn-outline-warning';
}

function getActionButtonText(score) {
    if (score === 0) return 'Start';
    if (score === 100) return 'Review';
    return 'Continue';
}

// Compare students functionality
function compareStudents(mySpojId, compareSpojId) {
    const me = findStudentBySpojId(mySpojId);
    const competitor = findStudentBySpojId(compareSpojId);
    
    if (!me || !competitor) {
        alert('One or both students not found. Please check Spoj IDs and try again.');
        return;
    }
    
    // Show comparison results container
    document.getElementById('comparisonResults').style.display = 'block';
    
    // Update comparison charts
    updateComparisonCharts(me, competitor);
    
    // Find advantage problems
    const advantageAnalysis = analyzeAdvantages(me, competitor);
    updateAdvantageAlerts(advantageAnalysis);
    
    // Update comparison table
    updateComparisonTable(me, competitor);
}

// Update comparison charts
function updateComparisonCharts(me, competitor) {
    if (!window.Chart) {
        console.warn('Chart.js not available. Charts will not be displayed.');
        return;
    }
    
    updateScoreComparisonChart(me, competitor);
    updateCategoryComparisonChart(me, competitor);
}

// Update score comparison chart
function updateScoreComparisonChart(me, competitor) {
    const ctx = document.getElementById('comparisonChart').getContext('2d');
    
    // Destroy existing chart if it exists
    if (window.comparisonChartInstance) {
        window.comparisonChartInstance.destroy();
    }
    
    // Prepare data
    const labels = [];
    const myScores = [];
    const competitorScores = [];
    
    // Start from index 1 to skip the overall grade, and exclude the last item (AC/Total)
    for (let i = 1; i < me.grades.length - 1; i++) {
        const problem = window.problems[i - 1];
        labels.push(problem.problemId);
        
        const myScore = me.grades[i] && me.grades[i].score !== null ? me.grades[i].score : 0;
        myScores.push(myScore);
        
        const competitorScore = competitor.grades[i] && competitor.grades[i].score !== null ? competitor.grades[i].score : 0;
        competitorScores.push(competitorScore);
    }
    
    // Create chart
    window.comparisonChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Your Score',
                    data: myScores,
                    backgroundColor: 'rgba(13, 110, 253, 0.2)',
                    borderColor: 'rgba(13, 110, 253, 1)',
                    borderWidth: 2,
                    tension: 0.1,
                    pointBackgroundColor: 'rgba(13, 110, 253, 1)',
                    pointRadius: 4
                },
                {
                    label: `${competitor.name}'s Score`,
                    data: competitorScores,
                    backgroundColor: 'rgba(220, 53, 69, 0.2)',
                    borderColor: 'rgba(220, 53, 69, 1)',
                    borderWidth: 2,
                    tension: 0.1,
                    pointBackgroundColor: 'rgba(220, 53, 69, 1)',
                    pointRadius: 4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Score'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Problems'
                    }
                }
            }
        }
    });
}

// Update category comparison chart
function updateCategoryComparisonChart(me, competitor) {
    const ctx = document.getElementById('categoryComparisonChart').getContext('2d');
    
    // Destroy existing chart if it exists
    if (window.categoryComparisonChartInstance) {
        window.categoryComparisonChartInstance.destroy();
    }
    
    // Define problem categories
    const categories = {
        'Basics': [],
        'Array/String': [],
        'Data Structures': [],
        'Algorithms': []
    };
    
    // Assign problems to categories
    window.problems.forEach((problem, index) => {
        if (index < 2) {
            categories['Basics'].push(index);
        } else if (index < 4) {
            categories['Array/String'].push(index);
        } else if (index < 6) {
            categories['Data Structures'].push(index);
        } else {
            categories['Algorithms'].push(index);
        }
    });
    
    // Calculate average scores per category
    const myCategoryAvgs = {};
    const competitorCategoryAvgs = {};
    
    Object.keys(categories).forEach(category => {
        const indices = categories[category];
        let mySum = 0;
        let competitorSum = 0;
        let count = 0;
        
        indices.forEach(idx => {
            // +1 because we need to skip the overall grade
            const myScore = me.grades[idx + 1] && me.grades[idx + 1].score !== null ? me.grades[idx + 1].score : 0;
            const competitorScore = competitor.grades[idx + 1] && competitor.grades[idx + 1].score !== null ? competitor.grades[idx + 1].score : 0;
            
            mySum += myScore;
            competitorSum += competitorScore;
            count++;
        });
        
        myCategoryAvgs[category] = count > 0 ? mySum / count : 0;
        competitorCategoryAvgs[category] = count > 0 ? competitorSum / count : 0;
    });
    
    // Create radar chart
    window.categoryComparisonChartInstance = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: Object.keys(categories),
            datasets: [
                {
                    label: 'You',
                    data: Object.values(myCategoryAvgs),
                    backgroundColor: 'rgba(13, 110, 253, 0.2)',
                    borderColor: 'rgba(13, 110, 253, 1)',
                    pointBackgroundColor: 'rgba(13, 110, 253, 1)',
                    pointRadius: 4
                },
                {
                    label: competitor.name,
                    data: Object.values(competitorCategoryAvgs),
                    backgroundColor: 'rgba(220, 53, 69, 0.2)',
                    borderColor: 'rgba(220, 53, 69, 1)',
                    pointBackgroundColor: 'rgba(220, 53, 69, 1)',
                    pointRadius: 4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: { display: true },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            }
        }
    });
}

// Analyze advantages between students
function analyzeAdvantages(me, competitor) {
    const competitorAdvantage = [];
    const myAdvantage = [];
    
    // Start from index 1 to skip the overall grade, and exclude the last item (AC/Total)
    for (let i = 1; i < me.grades.length - 1; i++) {
        const problem = window.problems[i - 1];
        
        const myScore = me.grades[i] && me.grades[i].score !== null ? me.grades[i].score : 0;
        const competitorScore = competitor.grades[i] && competitor.grades[i].score !== null ? competitor.grades[i].score : 0;
        
        // If competitor has solved but I haven't
        if (competitorScore === 100 && myScore < 100) {
            competitorAdvantage.push({
                id: problem.problemId,
                link: `http://www.spoj.com/EIUPROGR/problems/${problem.problemId}`,
                myScore: myScore,
                competitorScore: competitorScore
            });
        }
        
        // If I have solved but competitor hasn't
        if (myScore === 100 && competitorScore < 100) {
            myAdvantage.push({
                id: problem.problemId,
                link: `http://www.spoj.com/EIUPROGR/problems/${problem.problemId}`,
                myScore: myScore,
                competitorScore: competitorScore
            });
        }
    }
    
    return {
        competitorAdvantage: competitorAdvantage,
        myAdvantage: myAdvantage
    };
}

// Update advantage alerts
function updateAdvantageAlerts(advantageAnalysis) {
    const competitorAdvantageSection = document.getElementById('competitorAdvantage');
    const yourAdvantageSection = document.getElementById('yourAdvantage');
    const competitorAdvantageList = document.getElementById('competitorAdvantageList');
    const yourAdvantageList = document.getElementById('yourAdvantageList');
    
    // Update competitor advantage
    if (advantageAnalysis.competitorAdvantage.length > 0) {
        competitorAdvantageSection.style.display = 'block';
        
        let html = '';
        advantageAnalysis.competitorAdvantage.forEach(problem => {
            html += `
                <div class="competitor-advantage">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <strong>${problem.id}</strong>
                            ${problem.myScore > 0 ? 
                                `<span class="badge bg-warning ms-2">${problem.myScore}%</span>` : 
                                `<span class="badge bg-danger ms-2">Not Started</span>`
                            }
                        </div>
                        <a href="${problem.link}" target="_blank" class="btn btn-warning btn-sm">
                            <i class="bi bi-lightning-fill me-1"></i>Solve It!
                        </a>
                    </div>
                </div>
            `;
        });
        
        competitorAdvantageList.innerHTML = html;
    } else {
        competitorAdvantageSection.style.display = 'none';
    }
    
    // Update your advantage
    if (advantageAnalysis.myAdvantage.length > 0) {
        yourAdvantageSection.style.display = 'block';
        
        let html = '';
        advantageAnalysis.myAdvantage.forEach(problem => {
            html += `
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <div>
                        <strong>${problem.id}</strong>
                        <span class="badge bg-success ms-2">100%</span>
                    </div>
                    <span class="text-muted">
                        Competitor: ${problem.competitorScore > 0 ? 
                            `<span class="badge bg-warning">${problem.competitorScore}%</span>` : 
                            `<span class="badge bg-danger">Not Started</span>`
                        }
                    </span>
                </div>
            `;
        });
        
        yourAdvantageList.innerHTML = html;
    } else {
        yourAdvantageSection.style.display = 'none';
    }
}

// Update comparison table
function updateComparisonTable(me, competitor) {
    const tableBody = document.getElementById('comparisonTable').querySelector('tbody');
    tableBody.innerHTML = '';
    
    // Start from index 1 to skip the overall grade, and exclude the last item (AC/Total)
    for (let i = 1; i < me.grades.length - 1; i++) {
        const problem = window.problems[i - 1];
        
        const myScore = me.grades[i] && me.grades[i].score !== null ? me.grades[i].score : 0;
        const competitorScore = competitor.grades[i] && competitor.grades[i].score !== null ? competitor.grades[i].score : 0;
        const difference = myScore - competitorScore;
        
        // Create row
        const row = document.createElement('tr');
        
        // Highlight row if there's a significant advantage
        if (competitorScore === 100 && myScore < 100) {
            row.classList.add('table-danger');
        } else if (myScore === 100 && competitorScore < 100) {
            row.classList.add('table-success');
        }
        
        row.innerHTML = `
            <td>
                <a href="http://www.spoj.com/EIUPROGR/problems/${problem.problemId}" target="_blank">
                    ${problem.problemId}
                </a>
                ${competitorScore === 100 && myScore < 100 ? 
                    `<span class="advantage-badge">Competitor Advantage</span>` : ''}
            </td>
            <td>
                <div class="progress" style="height: 20px;">
                    <div class="progress-bar ${getProgressBarClass(myScore)}" role="progressbar" 
                        style="width: ${myScore}%" aria-valuenow="${myScore}" aria-valuemin="0" 
                        aria-valuemax="100">${myScore}%</div>
                </div>
            </td>
            <td>
                <div class="progress" style="height: 20px;">
                    <div class="progress-bar ${getProgressBarClass(competitorScore)}" role="progressbar" 
                        style="width: ${competitorScore}%" aria-valuenow="${competitorScore}" aria-valuemin="0" 
                        aria-valuemax="100">${competitorScore}%</div>
                </div>
            </td>
            <td class="text-${difference > 0 ? 'success' : (difference < 0 ? 'danger' : 'muted')}">
                <strong>${difference > 0 ? '+' : ''}${difference}</strong>
            </td>
        `;
        
        tableBody.appendChild(row);
    }
}

// Helper function to set up tab handling
function setupTabHandling(tabsSelector, contentSelector) {
    document.querySelectorAll(`${tabsSelector} button[data-bs-toggle="pill"]`).forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all tabs and content
            document.querySelectorAll(`${tabsSelector} button`).forEach(t => {
                t.classList.remove('active');
            });
            document.querySelectorAll(`${contentSelector} .tab-pane`).forEach(p => {
                p.classList.remove('show', 'active');
            });
            
            // Add active class to clicked tab and its content
            this.classList.add('active');
            const target = this.getAttribute('data-bs-target');
            document.querySelector(target).classList.add('show', 'active');
        });
    });
}
