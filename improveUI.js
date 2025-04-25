// Add required CSS and JS dependencies
function addDependencies() {
    // Add Bootstrap CSS
    $('head').append('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">');
    // Add Bootstrap Icons CSS
    $('head').append('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css">');
    // Add custom styles
    $('head').append(`
        <style>
            body { 
                padding: 20px; 
                background-color: #f8f9fa; 
                transition: background-color 0.3s ease;
            }
            .dashboard-card { 
                background: white;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                padding: 20px;
                margin-bottom: 20px;
                opacity: 0;
                transform: translateY(20px);
                animation: fadeInSlideUp 0.5s ease forwards;
            }
            .dashboard-card:nth-child(1) { animation-delay: 0.1s; }
            .dashboard-card:nth-child(2) { animation-delay: 0.2s; }
            .dashboard-card:nth-child(3) { animation-delay: 0.3s; }
            
            @keyframes fadeInSlideUp {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .stat-card {
                background: white;
                border-radius: 8px;
                padding: 15px;
                margin: 10px 0;
                box-shadow: 0 2px 4px rgba(0,0,0,0.08);
                text-align: center;
                transition: transform 0.2s ease, box-shadow 0.2s ease;
            }
            .stat-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 6px 12px rgba(0,0,0,0.1);
            }
            .stat-number {
                font-size: 24px;
                font-weight: bold;
                color: #0d6efd;
            }
            #updateTable {
                background: white;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                width: 100%;
                border-collapse: separate;
                border-spacing: 0;
                overflow: hidden;
                opacity: 0;
                animation: fadeInSlideUp 0.5s 0.4s ease forwards;
            }
            #updateTable th {
                background-color: #0d6efd !important;
                color: white;
                padding: 10px 8px;
                text-align: center;
            }
            #updateTable td {
                padding: 8px;
                border-bottom: 1px solid #dee2e6;
                transition: background-color 0.2s ease;
            }
            #updateTable tr:not(.summary):hover td {
                background-color: #e9ecef;
            }
            #updateTable tr:nth-child(even):not(.summary) {
                 background-color: rgba(0, 0, 0, 0.03); 
            }
            #updateTable tr:last-child td {
                 border-bottom: none;
            }
            #updateTable td.right { text-align: right; }
            #updateTable td.left { text-align: left; }
            #updateTable td.center { text-align: center; }

            #updateTable tr.summary {
                 font-weight: bold;
                 background-color: #cfe2ff !important;
                 color: #052c65; 
            }
            #updateTable tr.summary td {
                 border-top: 2px solid #0d6efd; 
            }

            #updateTable td.low-score {
                background-color: #fff3cd;
                color: #664d03;
                font-weight: bold;
            }
            #updateTable td.perfect-score {
                color: #198754;
                font-weight: bold;
            }

            .search-box {
                margin: 20px 0;
                padding: 20px;
            }
            
            .btn {
                transition: background-color 0.2s ease, transform 0.1s ease;
            }
            .btn:active {
                transform: scale(0.98);
            }
            
            .chart-container {
                position: relative;
                height: 300px;
                width: 100%;
                margin-bottom: 20px;
            }

            .nav-tabs {
                border-bottom: 1px solid #dee2e6;
                margin-bottom: 20px;
            }
            .nav-tabs .nav-link {
                margin-bottom: -1px;
                border: 1px solid transparent;
                border-top-left-radius: 0.25rem;
                border-top-right-radius: 0.25rem;
                padding: 0.75rem 1.5rem;
                font-weight: 500;
                color: #495057;
                transition: all 0.2s ease;
            }
            .nav-tabs .nav-link:hover {
                border-color: #e9ecef #e9ecef #dee2e6;
                isolation: isolate;
            }
            .nav-tabs .nav-link.active {
                color: #0d6efd;
                background-color: #fff;
                border-color: #dee2e6 #dee2e6 #fff;
                font-weight: 600;
            }
            
            .tab-content {
                padding: 20px 0;
            }
            .tab-pane {
                display: none;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            .tab-pane.active {
                display: block;
                opacity: 1;
            }
            
            #tableTab #updateTable {
                animation: none;
                opacity: 1;
                margin-top: 20px;
                width: 100%;
                table-layout: auto;
            }

            #table-container {
                overflow-x: auto;
                max-width: 100%;
                transition: all 0.3s ease;
            }
            
            #updateTable th a {
                color: #ffffff;
                font-weight: bold;
                text-decoration: underline;
            }
            
            #updateTable th a:hover {
                color: #f0f0f0;
                text-decoration: none;
            }
            
            /* Expanded table styles */
            .expanded-table-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(255,255,255,0.95);
                z-index: 1000;
                overflow: auto;
                padding: 20px;
                display: none;
            }
            
            .expanded-table-overlay.active {
                display: block;
            }
            
            .expanded-table-overlay .table-controls {
                position: sticky;
                top: 0;
                background: white;
                padding: 10px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                margin-bottom: 15px;
                z-index: 10;
            }
            
            /* Radar chart for skills */
            .skill-analysis-container {
                padding: 20px;
                border-radius: 8px;
                background: white;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                margin-bottom: 20px;
            }
            
            /* Progress chart section */
            .progress-container {
                padding: 15px;
                background: white;
                border-radius: 8px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                margin-bottom: 20px;
            }
            
            /* Heatmap styles */
            .heatmap-container {
                background: white;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                margin-bottom: 20px;
            }
            
            .heatmap-cell {
                width: 30px;
                height: 30px;
                display: inline-block;
                margin: 2px;
                border-radius: 3px;
                transition: transform 0.2s ease;
            }
            
            .heatmap-cell:hover {
                transform: scale(1.2);
                z-index: 2;
            }
            
            /* Top performers section */
            .top-performers {
                background: white;
                border-radius: 8px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                padding: 15px;
                margin-bottom: 20px;
            }
            
            .performer-item {
                display: flex;
                align-items: center;
                padding: 10px;
                border-bottom: 1px solid #eee;
            }
            
            .performer-rank {
                font-size: 18px;
                font-weight: bold;
                width: 30px;
            }
            
            .performer-info {
                flex-grow: 1;
                padding: 0 10px;
            }
            
            .performer-score {
                font-weight: bold;
                color: #0d6efd;
            }
        </style>
    `);
    
    // Return the jQuery promise object from getScript to indicate when Chart.js is loaded
    return $.getScript('https://cdn.jsdelivr.net/npm/chart.js');
}

// Create dashboard structure with tabs
function createDashboard() {
    // Create top-level container
    $('body').prepend(`
        <div class="container-fluid main-container">
            <h1 class="mb-4 text-primary">Grade Tracking System</h1>
            
            <!-- Tab Navigation -->
            <ul class="nav nav-tabs" id="mainTabs" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="dashboard-tab" data-bs-toggle="tab" data-bs-target="#dashboardTab" 
                        type="button" role="tab" aria-controls="dashboardTab" aria-selected="true">
                        <i class="bi bi-speedometer2 me-2"></i>Dashboard
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="table-tab" data-bs-toggle="tab" data-bs-target="#tableTab" 
                        type="button" role="tab" aria-controls="tableTab" aria-selected="false">
                        <i class="bi bi-table me-2"></i>Grade Table
                    </button>
                </li>
            </ul>
            
            <!-- Tab Content -->
            <div class="tab-content" id="mainTabsContent">
                <!-- Dashboard Tab -->
                <div class="tab-pane fade show active" id="dashboardTab" role="tabpanel" aria-labelledby="dashboard-tab">
                    <div class="dashboard-content">
                        <!-- Quick Stats Row -->
                        <div class="row">
                            <div class="col-lg-3 col-md-6 mb-3">
                                <div class="stat-card" id="totalStudents">
                                    <h5>Total Students</h5>
                                    <div class="stat-number">0</div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-6 mb-3">
                                <div class="stat-card" id="averageScore">
                                    <h5>Average Score</h5>
                                    <div class="stat-number">0</div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-6 mb-3">
                                <div class="stat-card" id="medianScore"> 
                                    <h5>Median Score</h5>
                                    <div class="stat-number">0</div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-6 mb-3">
                                <div class="stat-card" id="passRate">
                                    <h5>Pass Rate (&ge;60)</h5>
                                    <div class="stat-number">0%</div>
                                </div>
                            </div>
                        </div>

                        <!-- Primary Charts Row -->
                        <div class="row">
                            <div class="col-lg-6 mb-3">
                                <div class="dashboard-card">
                                    <h5 class="text-center mb-3">Score Distribution</h5>
                                    <div class="chart-container">
                                        <canvas id="scoreDistribution"></canvas>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 mb-3">
                                <div class="dashboard-card">
                                    <h5 class="text-center mb-3">Average Score per Problem</h5>
                                    <div class="chart-container">
                                        <canvas id="problemDifficultyChart"></canvas> 
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Top Performers Section -->
                        <div class="row">
                            <div class="col-lg-6 mb-3">
                                <div class="dashboard-card top-performers">
                                    <h5 class="text-center mb-3">Top Performers</h5>
                                    <div id="topPerformersList">
                                        <!-- Top performers will be populated here -->
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 mb-3">
                                <div class="dashboard-card">
                                    <h5 class="text-center mb-3">Skill Analysis</h5>
                                    <div class="chart-container">
                                        <canvas id="skillRadarChart"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Problem Difficulty Heatmap -->
                        <div class="row">
                            <div class="col-12 mb-3">
                                <div class="dashboard-card heatmap-container">
                                    <h5 class="text-center mb-3">Problem Difficulty Heatmap</h5>
                                    <div id="problemHeatmap" class="text-center">
                                        <!-- Heatmap will be generated here -->
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Export Section -->
                        <div class="row">
                            <div class="col-12 text-end mb-3">
                                <button class="btn btn-success" id="exportData">
                                    <i class="bi bi-download me-2"></i>Export Data (CSV)
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Table Tab -->
                <div class="tab-pane fade" id="tableTab" role="tabpanel" aria-labelledby="table-tab">
                    <div class="table-header mb-3">
                        <div class="row align-items-center">
                            <div class="col-md-8">
                                <h3>Complete Grade Table</h3>
                                <p class="text-muted">View detailed scores for all students and problems</p>
                            </div>
                            <div class="col-md-4 text-end">
                                <button class="btn btn-outline-primary" id="expandTableBtn">
                                    <i class="bi bi-arrows-fullscreen me-1"></i>Expand Table
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Search, Sort and Export Controls for Table Tab -->
                    <div class="dashboard-card search-box mb-4">
                        <div class="row g-3 align-items-center">
                            <div class="col-md-5">
                                <input type="text" class="form-control" id="tableStudentSearch" placeholder="Search by name or ID...">
                            </div>
                            <div class="col-md-4">
                                <select class="form-select" id="tableSortBy">
                                    <option value="name_asc">Sort by Name (A-Z)</option>
                                    <option value="name_desc">Sort by Name (Z-A)</option>
                                    <option value="grade_desc">Sort by Grade (High-Low)</option>
                                    <option value="grade_asc">Sort by Grade (Low-High)</option>
                                    <option value="id_asc">Sort by Code (Asc)</option>
                                    <option value="id_desc">Sort by Code (Desc)</option>
                                </select>
                            </div>
                            <div class="col-md-3 text-end">
                                <button class="btn btn-success" id="tableExportData"><i class="bi bi-download me-2"></i>Export CSV</button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Table container -->
                    <div id="table-container"></div>
                </div>
            </div>
        </div>
        
        <!-- Expanded Table Overlay -->
        <div class="expanded-table-overlay" id="expandedTableOverlay">
            <div class="table-controls">
                <div class="row align-items-center">
                    <div class="col-md-8">
                        <h3>Grade Table (Expanded View)</h3>
                    </div>
                    <div class="col-md-4 text-end">
                        <button class="btn btn-outline-primary" id="closeExpandedTable">
                            <i class="bi bi-arrows-angle-contract me-1"></i>Close Expanded View
                        </button>
                    </div>
                </div>
            </div>
            <div id="expanded-table-container"></div>
        </div>
    `);

    // Add Bootstrap JS for tab functionality
    $('head').append('<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>');

    // Hide original UI elements
    $('#updateGrade').hide();
    $('#content').hide();

    // Set up expanded table functionality
    setupExpandedTable();
    
    // Wait for the next tick to ensure the new structure is in the DOM
    setTimeout(function() {
        // Move the original table to the table tab
        const tableContainer = $('body > div:not(.container-fluid, .main-container, .expanded-table-overlay)').first();
        
        // Move the table to the table tab
        $('#table-container').append(tableContainer);
        
        // Add responsive wrapper for overflow
        $('#table-container').css('overflow-x', 'auto');
        
        // Set up tab handling
        setupTabHandling();
    }, 0);
}

// Set up manual tab handling for browsers without Bootstrap JS
function setupTabHandling() {
    $('#mainTabs .nav-link').on('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all tabs and content
        $('#mainTabs .nav-link').removeClass('active').attr('aria-selected', 'false');
        $('#mainTabsContent .tab-pane').removeClass('show active');
        
        // Add active class to clicked tab and its content
        $(this).addClass('active').attr('aria-selected', 'true');
        const target = $(this).data('bs-target') || $(this).attr('href');
        $(target).addClass('show active');
    });
}

// Set up expanded table functionality
function setupExpandedTable() {
    // Expand table button
    $('#expandTableBtn').on('click', function() {
        // Clone the table and move it to expanded view
        const tableClone = $('#table-container > div').clone();
        $('#expanded-table-container').html(tableClone);
        
        // Show the expanded view overlay
        $('#expandedTableOverlay').addClass('active');
        $('body').css('overflow', 'hidden'); // Prevent scrolling of main page
    });
    
    // Close expanded table button
    $('#closeExpandedTable').on('click', function() {
        $('#expandedTableOverlay').removeClass('active');
        $('body').css('overflow', '');
    });
    
    // Close on ESC key
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape' && $('#expandedTableOverlay').hasClass('active')) {
            $('#closeExpandedTable').click();
        }
    });
}

// Data analysis functions
function analyzeTableData() {
    const data = {
        students: [],
        scores: [],
        problemHeaders: [],
        problemAverages: [],
        totalSubmissions: 0,
        totalAC: 0,
        problemCategories: {
            'Basics': [],
            'Array/String': [],
            'Data Structures': [],
            'Algorithms': []
        }
    };

    // Get problem headers
    $('#updateTable tr:first th').slice(5, -1).each(function(index) {
        const problemText = $(this).find('a').text() || $(this).text();
        data.problemHeaders.push(problemText);
        
        // Categorize problems (basic algorithm)
        if (index < 2) {
            data.problemCategories['Basics'].push(index);
        } else if (index < 4) {
            data.problemCategories['Array/String'].push(index);
        } else if (index < 6) {
            data.problemCategories['Data Structures'].push(index);
        } else {
            data.problemCategories['Algorithms'].push(index);
        }
    });

    const problemCount = data.problemHeaders.length;
    const problemScoresSum = new Array(problemCount).fill(0);
    const problemSubmissionsCount = new Array(problemCount).fill(0);

    // Extract data from table rows (excluding header and summary)
    const rows = $('#updateTable tr:not(:first):not(.summary)');
    rows.each(function() {
        const cells = $(this).find('td');
        if (cells.length < 5) return;

        const overallScoreText = $(cells[4]).text();
        const overallScore = parseFloat(overallScoreText) || 0;
        
        // Apply conditional formatting class based on score
        $(cells[4]).removeClass('low-score perfect-score');
        if (overallScore < 60 && overallScoreText !== "") {
             $(cells[4]).addClass('low-score');
        } else if (overallScore === 100) {
             $(cells[4]).addClass('perfect-score');
        }

        const studentData = {
            rowElement: $(this),
            code: $(cells[1]).text(),
            name: $(cells[2]).text(),
            spojId: $(cells[3]).find('a').text(),
            overallScore: overallScore,
            problemScores: [],
            submissionText: $(cells[cells.length - 1]).text(),
            categoryAverages: {
                'Basics': 0,
                'Array/String': 0,
                'Data Structures': 0,
                'Algorithms': 0
            }
        };

        // Get individual problem scores and update sums
        for (let i = 5; i < cells.length - 1; i++) {
            const scoreText = $(cells[i]).text();
            const score = parseFloat(scoreText);
            $(cells[i]).removeClass('low-score perfect-score');
            if (!isNaN(score)) {
                studentData.problemScores.push(score);
                problemScoresSum[i - 5] += score;
                problemSubmissionsCount[i - 5]++;
                if (score < 60) $(cells[i]).addClass('low-score');
                else if (score === 100) $(cells[i]).addClass('perfect-score');
            } else {
                studentData.problemScores.push(null);
            }
        }
        
        // Calculate category averages for this student
        Object.keys(data.problemCategories).forEach(category => {
            const indices = data.problemCategories[category];
            let sum = 0;
            let count = 0;
            
            indices.forEach(idx => {
                const score = studentData.problemScores[idx];
                if (score !== null) {
                    sum += score;
                    count++;
                }
            });
            
            studentData.categoryAverages[category] = count > 0 ? sum / count : 0;
        });

        // Extract AC/Sub count
        const subMatch = studentData.submissionText.match(/(\d+)\/(\d+)/);
        if (subMatch) {
            studentData.AC = parseInt(subMatch[1]);
            studentData.submissions = parseInt(subMatch[2]);
            data.totalAC += studentData.AC;
            data.totalSubmissions += studentData.submissions;
        } else {
            studentData.AC = 0;
            studentData.submissions = 0;
        }

        data.students.push(studentData);
        if (!isNaN(studentData.overallScore)) {
             data.scores.push(studentData.overallScore);
        }
    });

    // Calculate average score per problem
    data.problemAverages = problemScoresSum.map((sum, index) => {
        const count = problemSubmissionsCount[index];
        return count > 0 ? (sum / count) : 0;
    });

    // Sort scores for median calculation
    data.scores.sort((a, b) => a - b);

    return data;
}

// Chart creation functions
function createCharts(data) {
    const ctxScore = document.getElementById('scoreDistribution')?.getContext('2d');
    const ctxProblem = document.getElementById('problemDifficultyChart')?.getContext('2d');
    const ctxSkill = document.getElementById('skillRadarChart')?.getContext('2d');

    if (!ctxScore || !ctxProblem || !ctxSkill) {
        console.error("Chart canvas elements not found!");
        return;
    }

    // Destroy existing charts if they exist
    if (window.scoreChartInstance) window.scoreChartInstance.destroy();
    if (window.problemChartInstance) window.problemChartInstance.destroy();
    if (window.skillChartInstance) window.skillChartInstance.destroy();

    // Score Distribution Chart (Bar)
    window.scoreChartInstance = new Chart(ctxScore, {
        type: 'bar',
        data: {
            labels: ['0-19', '20-39', '40-59', '60-79', '80-100'],
            datasets: [{
                label: 'Number of Students',
                data: calculateScoreDistribution(data.scores),
                backgroundColor: 'rgba(13, 110, 253, 0.6)',
                borderColor: 'rgba(13, 110, 253, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return ` ${context.raw} students`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: { display: true, text: 'Number of Students' }
                },
                x: {
                     title: { display: true, text: 'Score Range' }
                }
            },
            animation: {
                 duration: 1000,
                 easing: 'easeOutBounce' 
            }
        }
    });

    // Problem Difficulty Chart (Line - Average Score per Problem)
    window.problemChartInstance = new Chart(ctxProblem, {
        type: 'line',
        data: {
            labels: data.problemHeaders,
            datasets: [{
                label: 'Average Score',
                data: data.problemAverages,
                borderColor: 'rgba(25, 135, 84, 0.8)',
                backgroundColor: 'rgba(25, 135, 84, 0.2)',
                fill: true,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                 legend: { display: false },
                 tooltip: {
                     callbacks: {
                         label: function(context) {
                             return ` Avg Score: ${context.raw.toFixed(1)}`;
                         }
                     }
                 }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: { display: true, text: 'Average Score' }
                },
                x: {
                     title: { display: true, text: 'Problem' }
                }
            },
            animation: {
                 duration: 1000,
                 easing: 'easeOutCubic'
            }
        }
    });
    
    // Skill Radar Chart
    const categories = Object.keys(data.problemCategories);
    const classAvg = categories.map(cat => {
        let sum = 0;
        data.students.forEach(student => {
            sum += student.categoryAverages[cat];
        });
        return data.students.length > 0 ? sum / data.students.length : 0;
    });
    
    // Get top student for comparison
    const topStudent = [...data.students].sort((a, b) => b.overallScore - a.overallScore)[0];
    const topStudentData = topStudent ? categories.map(cat => topStudent.categoryAverages[cat]) : [];
    
    window.skillChartInstance = new Chart(ctxSkill, {
        type: 'radar',
        data: {
            labels: categories,
            datasets: [
                {
                    label: 'Class Average',
                    data: classAvg,
                    backgroundColor: 'rgba(13, 110, 253, 0.2)',
                    borderColor: 'rgba(13, 110, 253, 0.8)',
                    pointBackgroundColor: 'rgba(13, 110, 253, 1)',
                    borderWidth: 2
                },
                {
                    label: 'Top Student',
                    data: topStudentData,
                    backgroundColor: 'rgba(25, 135, 84, 0.2)',
                    borderColor: 'rgba(25, 135, 84, 0.8)',
                    pointBackgroundColor: 'rgba(25, 135, 84, 1)',
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: {
                        display: true
                    },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            },
            animation: {
                duration: 1000
            }
        }
    });
    
    // Create problem difficulty heatmap
    createProblemHeatmap(data);
    
    // Create top performers list
    createTopPerformersList(data);
}

// Create problem difficulty heatmap
function createProblemHeatmap(data) {
    const heatmapContainer = $('#problemHeatmap');
    heatmapContainer.empty();
    
    // Add legend
    const legend = $(`
        <div class="mb-3">
            <div class="d-flex justify-content-center">
                <div style="display: flex; align-items: center;">
                    <div style="width: 20px; height: 20px; background: #198754; margin-right: 5px; border-radius: 3px;"></div>
                    <span style="margin-right: 15px;">Easy (80-100)</span>
                </div>
                <div style="display: flex; align-items: center;">
                    <div style="width: 20px; height: 20px; background: #0dcaf0; margin-right: 5px; border-radius: 3px;"></div>
                    <span style="margin-right: 15px;">Medium (60-79)</span>
                </div>
                <div style="display: flex; align-items: center;">
                    <div style="width: 20px; height: 20px; background: #ffc107; margin-right: 5px; border-radius: 3px;"></div>
                    <span style="margin-right: 15px;">Hard (40-59)</span>
                </div>
                <div style="display: flex; align-items: center;">
                    <div style="width: 20px; height: 20px; background: #dc3545; margin-right: 5px; border-radius: 3px;"></div>
                    <span>Very Hard (<40)</span>
                </div>
            </div>
        </div>
    `);
    heatmapContainer.append(legend);
    
    data.problemAverages.forEach((avg, index) => {
        let color;
        if (avg >= 80) {
            color = '#198754'; // Green - Easy
        } else if (avg >= 60) {
            color = '#0dcaf0'; // Blue - Medium
        } else if (avg >= 40) {
            color = '#ffc107'; // Yellow - Hard
        } else {
            color = '#dc3545'; // Red - Very Hard
        }
        
        const cell = $(`<div class="heatmap-cell" style="background-color: ${color};" title="${data.problemHeaders[index]}: Avg ${avg.toFixed(1)}"></div>`);
        heatmapContainer.append(cell);
    });
}

// Create top performers list
function createTopPerformersList(data) {
    const topPerformersContainer = $('#topPerformersList');
    topPerformersContainer.empty();
    
    // Get top 5 students
    const topStudents = [...data.students]
        .sort((a, b) => b.overallScore - a.overallScore)
        .slice(0, 5);
    
    topStudents.forEach((student, index) => {
        const item = $(`
            <div class="performer-item">
                <div class="performer-rank">${index + 1}</div>
                <div class="performer-info">
                    <div class="performer-name">${student.name}</div>
                    <div class="text-muted small">${student.code}</div>
                </div>
                <div class="performer-score">${student.overallScore.toFixed(1)}</div>
            </div>
        `);
        topPerformersContainer.append(item);
    });
    
    // Add a link to show all
    topPerformersContainer.append(`
        <div class="text-center mt-3">
            <button class="btn btn-sm btn-outline-primary" id="viewAllStudents">
                View Complete Rankings
            </button>
        </div>
    `);
    
    // Set up click handler to switch to table tab
    $('#viewAllStudents').on('click', function() {
        $('#table-tab').click();
    });
}

// Helper functions
function calculateScoreDistribution(scores) {
    const distribution = [0, 0, 0, 0, 0]; // 0-19, 20-39, 40-59, 60-79, 80-100
    scores.forEach(score => {
        if (score < 20) distribution[0]++;
        else if (score < 40) distribution[1]++;
        else if (score < 60) distribution[2]++;
        else if (score < 80) distribution[3]++;
        else distribution[4]++;
    });
    return distribution;
}

// Calculate Median Score
function calculateMedian(sortedScores) {
    const mid = Math.floor(sortedScores.length / 2);
    if (sortedScores.length === 0) return 0;
    return sortedScores.length % 2 !== 0 
        ? sortedScores[mid] 
        : (sortedScores[mid - 1] + sortedScores[mid]) / 2;
}

// Search and filter functionality
function setupTableSearch(initialData) {
    let currentData = [...initialData.students]; // Use the analyzed data

    function renderTableRows(filteredData) {
        // Use the filtered data passed or fall back to currentData
        const dataToRender = filteredData || currentData;
        
        // Detach rows for performance before re-appending
        const rowsFragment = document.createDocumentFragment();
        dataToRender.forEach(student => {
            rowsFragment.appendChild(student.rowElement[0]); // Append the DOM element
        });
        
        // Clear existing rows (excluding header and summary) and append sorted/filtered rows
        $('#updateTable tr:not(:first):not(.summary)').remove();
        $('#updateTable tr:first').after(rowsFragment); // Insert after header

        // Re-apply conditional formatting after sorting/filtering
        dataToRender.forEach(student => {
            const overallCell = student.rowElement.find('td:eq(4)');
            overallCell.removeClass('low-score perfect-score');
            if (student.overallScore < 60 && !isNaN(student.overallScore)) {
                overallCell.addClass('low-score');
            } else if (student.overallScore === 100) {
                overallCell.addClass('perfect-score');
            }
            // Format problem cells too
            student.rowElement.find('td').slice(5, -1).each((index, cell) => {
                $(cell).removeClass('low-score perfect-score');
                const score = student.problemScores[index];
                if (score !== null) {
                    if (score < 60) $(cell).addClass('low-score');
                    else if (score === 100) $(cell).addClass('perfect-score');
                }
            });
        });
    }

    function performSearch(searchTerm) {
        searchTerm = searchTerm.toLowerCase().trim();
        
        if (searchTerm === '') {
            // If search is empty, restore all rows
            renderTableRows(initialData.students);
            return;
        }
        
        // Filter the data based on search term
        const filteredData = initialData.students.filter(student => {
            const name = student.name.toLowerCase();
            const code = student.code.toLowerCase();
            const spojId = student.spojId.toLowerCase();
            return name.includes(searchTerm) || code.includes(searchTerm) || spojId.includes(searchTerm);
        });
        
        // Update currentData and render
        currentData = filteredData;
        renderTableRows(filteredData);
    }

    function performSort(sortBy) {
        currentData.sort((a, b) => {
            switch(sortBy) {
                case 'name_asc':
                    return a.name.localeCompare(b.name);
                case 'name_desc':
                    return b.name.localeCompare(a.name);
                case 'grade_desc':
                    return b.overallScore - a.overallScore; // High to low
                case 'grade_asc':
                    return a.overallScore - b.overallScore; // Low to high
                case 'id_asc':
                    return a.code.localeCompare(b.code);
                case 'id_desc':
                    return b.code.localeCompare(a.code);
                default:
                    return 0;
            }
        });

        renderTableRows(); // Re-render the table with sorted rows
    }

    // Event handler for dashboard search input
    $('#studentSearch').on('input', function() {
        const searchTerm = $(this).val();
        $('#tableStudentSearch').val(searchTerm); // Keep table search in sync
        performSearch(searchTerm);
    });

    // Event handler for table tab search input
    $('#tableStudentSearch').on('input', function() {
        const searchTerm = $(this).val();
        $('#studentSearch').val(searchTerm); // Keep dashboard search in sync
        performSearch(searchTerm);
    });

    // Event handler for dashboard sort dropdown
    $('#sortBy').on('change', function() {
        const sortBy = $(this).val();
        $('#tableSortBy').val(sortBy); // Keep table sort in sync
        performSort(sortBy);
    });

    // Event handler for table tab sort dropdown
    $('#tableSortBy').on('change', function() {
        const sortBy = $(this).val();
        $('#sortBy').val(sortBy); // Keep dashboard sort in sync
        performSort(sortBy);
    });
}
// Export functionality
function setupExport(data) {
    // Handle export from dashboard tab
    $('#exportData, #tableExportData').click(function() {
        const csv = convertToCSV(data); 
        downloadCSV(csv, 'grade_data.csv');
    });
}

function convertToCSV(data) {
    const headers = ['Code', 'Name', 'SpojID', 'Overall Score', ...data.problemHeaders, 'AC/Submissions'];
    
    const rows = data.students.map(student => [
        `"${student.code}"`,
        `"${student.name}"`,
        `"${student.spojId}"`,
        student.overallScore,
        ...student.problemScores.map(score => score === null ? '' : score),
        `"${student.submissionText}"`
    ]);

    return [headers.join(','), ...rows.map(row => row.join(','))].join('\\n');
}

function downloadCSV(csv, filename) {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (navigator.msSaveBlob) {
        navigator.msSaveBlob(blob, filename);
    } else {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
}

// Update dashboard stats
function updateDashboardStats(data) {
    const studentCount = data.students.length;
    const validScores = data.scores;
    const averageScore = validScores.length > 0 ? (validScores.reduce((a, b) => a + b, 0) / validScores.length) : 0;
    const medianScore = calculateMedian(validScores);
    const passCount = validScores.filter(score => score >= 60).length;
    const passRate = studentCount > 0 ? (passCount / studentCount) * 100 : 0;

    $('#totalStudents .stat-number').text(studentCount);
    $('#averageScore .stat-number').text(averageScore.toFixed(1));
    $('#medianScore .stat-number').text(medianScore.toFixed(1));
    $('#passRate .stat-number').text(passRate.toFixed(1) + '%');
}

// Function to initialize the dashboard once the table is ready
function initializeDashboard() {
    if (window.dashboardInitialized) return;
    window.dashboardInitialized = true;
    console.log("Adding dependencies...");

    addDependencies().done(function() {
        console.log("Chart.js loaded. Initializing dashboard...");
        createDashboard();

        const data = analyzeTableData();
        if (data.students.length === 0) {
            console.warn("No student data found in the table.");
            return;
        }

        createCharts(data);
        updateDashboardStats(data);
        setupTableSearch(data);
        setupExport(data);
        console.log("Dashboard initialized.");

    }).fail(function(jqxhr, settings, exception) {
         console.error("Failed to load Chart.js:", exception);
         createDashboard();
         const data = analyzeTableData();
         if (data.students.length > 0) {
             updateDashboardStats(data);
             setupTableSearch(data);
             setupExport(data);
             $('.chart-container').parent().hide();
             console.warn("Dashboard initialized without charts due to loading error.");
         } else {
             console.warn("No student data found, dashboard partially initialized.");
         }
    });
}

// Use MutationObserver to wait for the table to be populated
$(document).ready(function() {
    const tableId = 'updateTable';
    const targetNode = document.getElementById(tableId);

    if (!targetNode) {
        console.error(`Target table with id "${tableId}" not found.`);
        return;
    }

    const config = { childList: true, subtree: true };

    const callback = function(mutationsList, observer) {
        const tableRows = $(`#${tableId} tr`);
        if (tableRows.length > 1 && !$(tableRows[1]).hasClass('summary')) {
            console.log("Table content detected.");
            initializeDashboard();
            observer.disconnect();
        }
    };

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);

    if ($(`#${tableId} tr`).length > 1 && !$($(`#${tableId} tr`)[1]).hasClass('summary')) {
         console.log("Table already populated on load.");
         initializeDashboard();
         observer.disconnect(); 
    } else {
        console.log("Waiting for table content...");
    }

    setTimeout(() => {
        if ($(`#${tableId} tr`).length <= 1 || $($(`#${tableId} tr`)[1]).hasClass('summary')) {
             console.warn("Table content did not load within the expected time.");
             if ($(`#${tableId} tr`).length > 0 && !window.dashboardInitialized) {
             }
             observer.disconnect();
        }
    }, 15000);
});

// Global flag to prevent multiple initializations
window.dashboardInitialized = false;

// Manually set up tab navigation if Bootstrap JS isn't loaded
$(document).on('click', '#mainTabs .nav-link', function(e) {
    if (typeof bootstrap === 'undefined') {
        e.preventDefault();
        const target = $(this).data('bs-target') || $(this).attr('href');
        
        $('#mainTabs .nav-link').removeClass('active').attr('aria-selected', 'false');
        $('#mainTabsContent .tab-pane').removeClass('show active');
        
        $(this).addClass('active').attr('aria-selected', 'true');
        $(target).addClass('show active');
    }
});
