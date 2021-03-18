<!DOCTYPE html>
<html>
  <head>
    <title>Axel Management</title>
    <!-- needed for adaptive design -->
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link
      href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Roboto:300,400,700"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/jquery-jsonview/1.2.3/jquery.jsonview.min.css"
    />

    <!-- Custom fonts for this template-->
    <link
      href="/axel-manager/vendor/fontawesome-free/css/all.min.css"
      rel="stylesheet"
      type="text/css"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
      rel="stylesheet"
    />

    <!-- Custom styles for this template-->
    <link href="/axel-manager/css/sb-admin-2.css" rel="stylesheet" />

    <!--
    ReDoc doesn't change outer page styles
    -->
    <style>
      :root {
        --primary: <%= axel.config.framework.primaryColor || '#FE4D17' %>;
        --secondary: <%= axel.config.framework.secondaryColor || '#0A1351' %>;
        --background: <%= axel.config.framework.backgroundColor || '#fefefe' %>;
        --light: <%= axel.config.framework.backgroundColor || '#fefefe' %>;
      }
      body {
        margin: 0;
        padding: 0;
      }
    </style>
  </head>

  <body id="page-top">
    <div id="app">
      <!-- Page Wrapper -->
      <div id="wrapper">
        <!-- Sidebar -->
        <ul
          class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
          id="accordionSidebar"
        >
          <!-- Sidebar - Brand -->
          <a
            class="sidebar-brand d-flex align-items-center justify-content-center"
            href="/"
          >
            <div class="sidebar-brand-icon rotate-n-15">
              <img
                src="/axel-manager/img/axel.png"
                style="
    width: 49px;
    background: white;
    border-radius: 50%;
    "
                alt=""
              />
            </div>
            <div class="sidebar-brand-text mx-3">Axel framework </div>

          </a>

          <!-- Divider -->
          <hr class="sidebar-divider my-0" />

          <!-- Nav Item - Dashboard -->
          <li class="nav-item active">
            <a class="nav-link" href="/">
              <i class="fas fa-fw fa-tachometer-alt"></i>
              <span>Dashboard</span></a
            >
          </li>

          <!-- Divider -->
          <hr class="sidebar-divider" />

          <!-- Heading -->
          <div class="sidebar-heading">
            Debug
          </div>

          <!-- Nav Item - Pages Collapse Menu -->
          <li class="nav-item">
            <a
              class="nav-link collapsed"
              href="#"
              data-toggle="collapse"
              data-target="#collapseTwo"
              aria-expanded="true"
              aria-controls="collapseTwo"
            >
              <i class="fas fa-fw fa-cog"></i>
              <span>Admin</span>
            </a>
            <div
              id="collapseTwo"
              class="collapse show"
              aria-labelledby="headingTwo"
              data-parent="#accordionSidebar"
            >
              <div class="bg-white py-2 collapse-inner show rounded">
                <h6 class="collapse-header">Actions</h6>
                <a class="collapse-item" href="#" @click="resetModelsAdminConfig()">Reset admin models</a>
                <a class="collapse-item" href="cards.html">Cards</a>
              </div>
            </div>
          </li>

          <!-- Divider -->
          <hr class="sidebar-divider" />

          <!-- Heading -->
          <div class="sidebar-heading">
            Api
          </div>

          <!-- Nav Item - Tables -->
          <li class="nav-item">
            <a class="nav-link" href="/documentation">
              <i class="fas fa-fw fa-table"></i>
              <span>Documentation</span></a
            >
          </li>

          <!-- Nav Item - Tables -->
          <li class="nav-item">
            <a class="nav-link" href="/console">
              <i class="fas fa-fw fa-table"></i>
              <span>Api console</span></a
            >
          </li>

          <!-- Nav Item - Tables -->
          <li class="nav-item">
            <a class="nav-link" href="/api/swagger.json">
              <i class="fas fa-fw fa-table"></i>
              <span>Swagger json</span></a
            >
          </li>

          <li class="nav-item">
            <a class="nav-link" href="/api/swagger.yml">
              <i class="fas fa-fw fa-table"></i>
              <span>Swagger yml</span></a
            >
          </li>

          <!-- Nav Item - Tables -->
          <li class="nav-item">
            <a class="nav-link" href="/admin">
              <i class="fas fa-fw fa-table"></i>
              <span>Admin</span></a
            >
          </li>

          <!-- Divider -->
          <hr class="sidebar-divider d-none d-md-block" />

          <!-- Sidebar Toggler (Sidebar) -->
          <div class="text-center d-none d-md-inline">
            <button class="rounded-circle border-0" id="sidebarToggle"></button>
          </div>
        </ul>
        <!-- End of Sidebar -->

        <!-- Content Wrapper -->
        <div id="content-wrapper" class="d-flex flex-column">
          <!-- Main Content -->
          <div id="content">
            <!-- Topbar -->
            <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
              <!-- Sidebar Toggle (Topbar) -->
              <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
                <i class="fa fa-bars"></i>
              </button>

              <!-- Topbar Search -->
              <h4 class="text-primary"><%= axel.config.app %> | <%= axel.config.env %></h4>
              <form
                class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search"
              >
                <div class="input-group d-none">
                  <input
                    type="text"
                    class="form-control bg-light border-0 small"
                    placeholder="Search for..."
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                  />
                  <div class="input-group-append">
                    <button class="btn btn-primary" type="button">
                      <i class="fas fa-search fa-sm"></i>
                    </button>
                  </div>
                </div>
              </form>

              <!-- Topbar Navbar -->
              <ul class="navbar-nav ml-auto">
                <!-- Nav Item - Search Dropdown (Visible Only XS) -->
                <li class="nav-item dropdown no-arrow d-sm-none">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="searchDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i class="fas fa-search fa-fw"></i>
                  </a>
                  <!-- Dropdown - Messages -->
                  <div
                    class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                    aria-labelledby="searchDropdown"
                  >
                    <form class="form-inline mr-auto w-100 navbar-search">
                      <div class="input-group">
                        <input
                          type="text"
                          class="form-control bg-light border-0 small"
                          placeholder="Search for..."
                          aria-label="Search"
                          aria-describedby="basic-addon2"
                        />
                        <div class="input-group-append">
                          <button class="btn btn-primary" type="button">
                            <i class="fas fa-search fa-sm"></i>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </li>

                <!-- Nav Item - Alerts -->
                <li class="nav-item no-arrow mx-1">
                  <a
                    class="nav-link"
                    :class="isConnected ? 'text-success' : 'text-danger'"
                    href="#"
                    id="alertsDropdown"
                    role="button"
                  >
                    <i class="fas fa-bell fa-fw"></i>
                    <span class="" v-if="!isConnected">Server is not connected</span>
                    <span class="" v-if="isConnected">Server is connected</span>
                    <!-- Counter - Alerts -->
                  </a>
                </li>

                <!-- Nav Item - Messages -->
                <li class="nav-item dropdown no-arrow mx-1">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="messagesDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i class="fas fa-envelope fa-fw"></i>
                    <!-- Counter - Messages -->
                    <span class="badge badge-danger badge-counter">7</span>
                  </a>
                  <!-- Dropdown - Messages -->
                  <div
                    class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                    aria-labelledby="messagesDropdown"
                  >
                    <h6 class="dropdown-header">
                      Message Center
                    </h6>
                    <a class="dropdown-item d-flex align-items-center" href="#">
                      <div class="dropdown-list-image mr-3">
                        <img
                          class="rounded-circle"
                          src="https://source.unsplash.com/fn_BT9fwg_E/60x60"
                          alt=""
                        />
                        <div class="status-indicator bg-success"></div>
                      </div>
                      <div class="font-weight-bold">
                        <div class="text-truncate">
                          Hi there! I am wondering if you can help me with a problem I've been
                          having.
                        </div>
                        <div class="small text-gray-500">Emily Fowler · 58m</div>
                      </div>
                    </a>
                    <a class="dropdown-item d-flex align-items-center" href="#">
                      <div class="dropdown-list-image mr-3">
                        <img
                          class="rounded-circle"
                          src="https://source.unsplash.com/AU4VPcFN4LE/60x60"
                          alt=""
                        />
                        <div class="status-indicator"></div>
                      </div>
                      <div>
                        <div class="text-truncate">
                          I have the photos that you ordered last month, how would you like them
                          sent to you?
                        </div>
                        <div class="small text-gray-500">Jae Chun · 1d</div>
                      </div>
                    </a>
                    <a class="dropdown-item d-flex align-items-center" href="#">
                      <div class="dropdown-list-image mr-3">
                        <img
                          class="rounded-circle"
                          src="https://source.unsplash.com/CS2uCrpNzJY/60x60"
                          alt=""
                        />
                        <div class="status-indicator bg-warning"></div>
                      </div>
                      <div>
                        <div class="text-truncate">
                          Last month's report looks great, I am very happy with the progress so far,
                          keep up the good work!
                        </div>
                        <div class="small text-gray-500">Morgan Alvarez · 2d</div>
                      </div>
                    </a>
                    <a class="dropdown-item d-flex align-items-center" href="#">
                      <div class="dropdown-list-image mr-3">
                        <img
                          class="rounded-circle"
                          src="https://source.unsplash.com/Mv9hjnEUHR4/60x60"
                          alt=""
                        />
                        <div class="status-indicator bg-success"></div>
                      </div>
                      <div>
                        <div class="text-truncate">
                          Am I a good boy? The reason I ask is because someone told me that people
                          say this to all dogs, even if they aren't good...
                        </div>
                        <div class="small text-gray-500">
                          Chicken the Dog · 2w
                        </div>
                      </div>
                    </a>
                    <a class="dropdown-item text-center small text-gray-500" href="#"
                      >Read More Messages</a
                    >
                  </div>
                </li>

                <div class="topbar-divider d-none d-sm-block"></div>

                <!-- Nav Item - User Information -->
                <!--
              <li class="nav-item dropdown no-arrow">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="userDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span class="mr-2 d-none d-lg-inline text-gray-600 small"
                    >Valerie Luna</span
                  >
                  <img
                    class="img-profile rounded-circle"
                    src="https://source.unsplash.com/QAB-WJcbgJk/60x60"
                  />
                </a>
                <!-- Dropdown - User Information -->
                <!--
                <div
                  class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                  aria-labelledby="userDropdown"
                >
                  <a class="dropdown-item" href="#">
                    <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                    Profile
                  </a>
                  <a class="dropdown-item" href="#">
                    <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                    Settings
                  </a>
                  <a class="dropdown-item" href="#">
                    <i class="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                    Activity Log
                  </a>
                  <div class="dropdown-divider"></div>
                  <a
                    class="dropdown-item"
                    href="#"
                    data-toggle="modal"
                    data-target="#logoutModal"
                  >
                    <i
                      class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"
                    ></i>
                    Logout
                  </a>
                </div>
              </li>
              --></ul>
            </nav>
            <!-- End of Topbar -->

            <!-- Begin Page Content -->
            <div class="container-fluid">
              <!-- Page Heading -->
              <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
                <a
                  href="#"
                  class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
                  data-toggle="modal"
                  data-target="#newApiModal"
                  ><i class="fas fa-plus fa-sm text-white-50"></i> New Api</a
                >
              </div>

              <!-- Content Row -->
              <div class="row">
                <div class="col-4 col-xs-12">
                  <div class="card shadow mb-4">
                    <div
                      class="card-header py-3 d-flex flex-row align-items-center justify-content-between"
                    >
                      <h6 class="m-0 font-weight-bold text-primary">
                        Models <span class="badge badge-primary">{{ models.length }}</span>
                      </h6>

                      <div class="btn-group float-right ">
                        <button class="btn btn-link mr-2" @click="listModels()">
                          <i class="fa fa-sync"></i>
                        </button>
                        <button class="btn btn-link p-0"
                                          data-toggle="modal"
                  data-target="#newApiModal"
                        >
                          <i class="fa fa-plus"></i>
                        </button>
                      </div>
                    </div>
                    <div class="card-body p-2 ">
                      <table class="table table-bordered" id="dataTable" cellspacing="0">
                        <thead>
                          <tr>
                            <td>
                              <span class="text-secondary">ALL</span>
                              <div class="float-right">
                                <button class="btn btn-primary badge" @click="syncModel('$ALL')">
                                  sync
                                </button>
                                <button
                                  class="btn btn-secondary badge "
                                  @click="syncModel('$ALL', {force: true, alter: true})"
                                >
                                  Drop and sync
                                </button>
                              </div>
                            </td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="model in models">
                            <td>
                              {{ model }}
                              <div class="float-right">
                                <button class="btn btn-primary badge" @click="syncModel(model)">
                                  sync
                                </button>
                                <button
                                  class="btn btn-secondary badge "
                                  @click="syncModel(model, {force: true, alter: true})"
                                >
                                  Drop and sync
                                </button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div class="col-4 col-xs-12">
                  <div class="card shadow mb-4">
                    <div
                      class="card-header py-3 d-flex flex-row align-items-center justify-content-between"
                    >
                      <h6 class="m-0 font-weight-bold text-primary">
                        Controllers <span class="badge badge-primary">{{ Object.keys(controllers).length }}</span>
                      </h6>
                      <div class="btn-group float-right ">
                        <button class="btn btn-link mr-2" @click="listControllers()">
                          <i class="fa fa-sync"></i>
                        </button>
                        <button class="btn btn-link p-0" @click="createController()">
                          <i class="fa fa-plus"></i>
                        </button>
                      </div>
                    </div>
                    <div class="card-body p-2 ">
                      <table class="table table-bordered" id="dataTable" cellspacing="0">
                        <thead>
                          <tr></tr>
                        </thead>

                        <tbody>
                          <tr v-for="(controller, id) in controllers">
                            <td>{{ id }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div class="col-4">
                  <div class="card shadow mb-4">
                    <div
                      class="card-header py-3 d-flex flex-row align-items-center justify-content-between"
                    >
                      <h6 class="m-0 font-weight-bold text-primary">
                        Routes <span class="badge badge-primary">{{ Object.keys(controllers).length }}</span>
                      </h6>
                      <div class="float-right">
                        <button class="btn btn-link p-0" @click="listRoutes()">
                          <i class="fa fa-sync"></i>
                        </button>
                        <button class="btn btn-link p-0" @click="createRoute()">
                          <i class="fa fa-plus"></i>
                        </button>
                      </div>
                    </div>
                    <div class="card-body p-2 table-responsive">
                      <table class="table table-bordered" id="dataTable" cellspacing="0">
                        <thead>
                          <tr>
                            <th>Route</th>
                            <th>Target</th>
                          </tr>
                        </thead>

                        <tbody style="max-height:50vh; overflow: auto">
                           <tr v-for="(route, id) in routes">
                            <td style="width: 40%;">{{ id }}</td>
                            <td >{{ route }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <!-- Content Row -->
                <div class="row">
                  <div class="col-12">
                    <div class="card shadow mb-4">
                      <div
                        class="card-header py-3 d-flex flex-row align-items-center justify-content-between"
                      >
                        <h6 class="m-0 font-weight-bold text-primary">
                          Raw
                        </h6>
                      </div>
                      <div class="card-body">
                        <pre id="jstree"></pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- /.container-fluid -->
          </div>
          <!-- End of Main Content -->

          <!-- Footer -->
          <footer class="sticky-footer bg-white">
            <div class="container my-auto">
              <div class="copyright text-center my-auto">
                <span>Copyright &copy; axel 2020 with SB ADMIN 2</span>
              </div>
            </div>
          </footer>
          <!-- End of Footer -->
        </div>
        <!-- End of Content Wrapper -->
      </div>
      <!-- End of Page Wrapper -->

      <!-- Scroll to Top Button-->
      <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up"></i>
      </a>

      <!-- Logout Modal-->
      <div
        class="modal fade"
        id="newApiModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Create new api</h5>
              <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label> Api name</label>
                <input
                  v-model="newApi.name"
                  type="text"
                  class="form-control"
                  placeholder="Api name"
                />
              </div>
              <div class="form-group">
                <label> DB type</label>
                <select
                  v-model="newApi.type"
                  type="text"
                  class="form-control"
                  placeholder="Api type"
                >
                  <option disabled selected>Api type</option>
                  <option value="sql">Sql</option>
                  <option value="mongo">Mongo</option>
                </select>
              </div>
              <div class="form-check" v-if="newApi.type=='sql'">
                <input
                  v-model="newApi.withSchema"
                  type="checkbox"
                  class="form-check-input"
                  placeholder="Api type"
                />
                <label class="form-check-label"> Also generate Schema  ?</label>
              </div>
              <hr />
              <div class="form-group">
                <table class="table table-bordered" id="dataTable" cellspacing="0">
                  <thead>
                    <tr>
                      Fields

                      <div class="float-right">
                        <button class="btn btn-link p-0" @click="addField()">
                          <i class="fa fa-plus"></i>
                        </button>
                      </div>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>
                       Name
                      </td>
                      <td>
                        Type
                      </td>
                      <td>
                        Primary key
                      </td>
                      <td>
                        Required
                      </td>
                    </tr>
                    <tr v-for="field in newApi.fields">
                      <td>
                        <input
                          v-model="field.name"
                          type="text"
                          class="form-control"
                          placeholder="Field name"
                        />
                      </td>
                      <td>
                        <select
                          v-model="field.type"
                          type="text"
                          class="form-control"
                          placeholder="Field type"
                        >
                        <option v-for="type in fieldTypes">{{ type }}</option>
                        </select>
                      </td>
                      <td>
                        <input
                          v-model="field.primaryKey"
                          type="checkbox"
                          class=""
                          placeholder="Primary"
                        />
                      </td>
                      <td>
                        <input
                          :disabled="field.primaryKey"
                          v-model="field.required"
                          type="checkbox"
                          placeholder="Required"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" type="button" data-dismiss="modal">
                Cancel
              </button>
              <button
                class="btn btn-primary"
                @click="createApi"
                :disabled="!newApi || !newApi.name || !newApi.type"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ul id="events"></ul>
    <script src="/axel-manager/js/socket.io.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>

    <!-- Bootstrap core JavaScript-->
    <script src="/axel-manager/vendor/jquery/jquery.min.js"></script>
    <script src="/axel-manager/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

    <!-- Core plugin JavaScript-->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-jsonview/1.2.3/jquery.jsonview.js"></script>
    <script src="/axel-manager/vendor/jquery-easing/jquery.easing.min.js"></script>

    <!-- Custom scripts for all pages-->
    <script src="/axel-manager/js/sb-admin-2.min.js"></script>

    <!-- Page level plugins -->
    <script src="/axel-manager/vendor/chart.js/Chart.min.js"></script>

    <!-- Page level custom scripts -->
    <script src="/axel-manager/js/demo/chart-area-demo.js"></script>
    <script src="/axel-manager/js/demo/chart-pie-demo.js"></script>
    <script src="/axel-manager/js/vue/vue.js"></script>
    <script src="/axel-manager/js/axios.min.js"></script>

    <script>
              $(function () {
                $('#jstree').JSONView(
                  {
                    config: <%- JSON.stringify(axel.config) %>,
                    routes: <%- JSON.stringify(axel.config.routes || {}) %>,
                    controllers: <%- JSON.stringify(axel.controllers) %>,
                  }
              , {collapsed: true});
            });
            window.App  = window.App  || {};
            const Swal2 = Swal.mixin({
                      customClass: {
                        confirmButton: 'btn btn-primary ml-1',
                        cancelButton: 'btn btn-danger btn-light'
                      },
                      buttonsStyling: false,
                      reverseButtons: true
      })
    </script>
    <script>
       Vue.prototype.$http = axios.create({
         baseURL: '/',
         timeout: 20000,
         headers: {
           Accept: 'application/json',
           'Content-Type': 'application/json',
           //    Authorization: `Bearer ${localStorage.getItem(`${config.appName}_token`)}`,
         },
       });
       window.socket = io();
       socket._call = function (method, event, options) {
          const that = this;
         return new Promise((resolve, reject) => {
          if (!that) {
              reject('No socket connection.');
          } else {
              that.socket.emit(event, {...options, method}, (err, data) => {
                console.log(err, data)
                  if (err) {
                      console.error(err);
                      reject(err);
                  } else {
                      resolve(data);
                  }
              });
          }
      });
       }

       socket.get = socket._call.bind(undefined, 'GET');
       socket.post = socket._call.bind(undefined, 'POST');
       socket.put = socket._call.bind(undefined, 'PUT');
       socket.delete = socket._call.bind(undefined, 'DELETE');
       Vue.prototype.$socket = socket;
       App.vue = new Vue({
         el: '#app',

         data: {
           message: 'Hello Vue !',
           controllers: <%- JSON.stringify(axel.controllers) %>,
           models: [],
           routes: null,
           socket: socket,
           blockingModal: null,
           newApi: {
             name: '',
             type: null,
             withSchema: false,
             fields:[]
           },
           newApiTemplate: {
             name: '',
             type: null,
             withSchema: false,
             fields:[]
           },
           fieldTypes: [
             'string',
             'text',
             'integer',
             'boolean',
             'date',
             'datetime'
           ]
         },
         mounted() {
           this.$socket.on('connect', (a) => {
             this.refreshLists();
           });

           this.$socket.on('disconnect', (a) => {
             console.log(a); // false
           });

           this.$socket.on('hello', (second) => {
           console.log('second', second);
         });
         },
         computed: {
           isConnected() {
             return this.socket && this.socket.connected
           }
         },
         watch: {
           'socket.connected': (newVal, oldVal) => {
             console.log('newVal', newVal, 'oldVal', oldVal);
             if (!newVal && oldVal !== newVal) {
               this.blockingModal = Swal2.fire({
                 html: "<h3>Server is disconnected</h3><br><img src='data:image/gif;base64,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' />",
                 showCancelButton: false,
                 showConfirmButton: false,
                 showCloseButton: false,
                 allowOutsideClick: false,
                 allowEscapeKey: false,
               });
             }
             else if (this.blockingModal) {
               this.blockingModal.close();
               this.refreshLists();
             }
           }
         },
         methods: {
          $notify(text, type) {
              return Swal2.fire({title: text,
              icon: type || 'info', toast: true, position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
            });
           },
           refreshLists() {
             this.listControllers();
             this.listModels();
             this.listRoutes();
           },

           addField() {
            this.newApi.fields.push({type: 'string'});
           },

           async listControllers() {
             this.$socket.emit('/axel-manager/controllers', (err, data) => {
                 if (err) {
                   console.warn(err.message);
                   return;
                 }
                 console.log( this.controllers)
                 this.controllers = data.body
             });
           },
           async listModels() {
             this.models = [];
             this.$socket.get('/axel-manager/models')
             .then(data => {
                 this.models = data.body && data.body.models
                 this.tables = data.body && data.body.tables
             })
             .catch(err => {
              console.warn(err.message);
             });
           },
           async listRoutes() {
             this.routes = [];
             this.$socket.get('/axel-manager/routes')
             .then(data => {
                 this.routes = data.body
                 console.log(data)
             })
             .catch(err => {
              console.warn(err.message);
             });
           },
           async syncModel(modelName, options = {alter: true}) {
             const {force, alter} = options;
             this.$socket.emit('/axel-manager/models/sync',{method: 'POST', body: {id: modelName, force, alter}}, (err, data) => {
                 if (err) {
                   console.warn(err);
                   this.$notify(`Error while updating Model ${modelName} [${err.message || err}]`, 'error');
                   return;
                 }
                 this.$notify(`Model ${modelName} was updated`, 'success');
                 this.listModels();
             });
           },
           async createController() {
             const values = await Swal2.fire({
               title: 'Create a new controller',
               html: `
                 <input id="swal-name" class="swal2-input" placeholder="Name">
                 <select id="swal-type" class="swal2-input" placeholder="type">
                   <option selected>bare</option>
                   <option>sql</option>
                   <option disabled>mongo</option>
                 </select>
                   <label>
                 <input id="swal-force" type="checkbox" class="swal2-checkbox" placeholder="force" value="true">
                 Force
                 </label>
                 `,
               focusConfirm: false,
               showCancelButton: true,
               reverseButtons: true,
               preConfirm: () => {
                 let values = [
                   document.getElementById('swal-name').value,
                   document.getElementById('swal-type').value,
                   document.getElementById('swal-force').value == 'true',
                 ];
                 values = values.filter(v => v);
                 if (values.length < 3) {
                   return Swal2.fire({title: 'Please fill in all the data', icon: 'error'});
                 }
                 if (values[2] == 'true') {
                   values[2] = true;
                 }
                 return values;
               },

             });
             console.log("values", values)
             this.$http.post('/api/axel-manager/controllers', {name: values.value[0], type: values.value[1], force: values.value[2]})
             .then(() => {
               return Swal2.fire({title: 'Controller successfully created', icon: 'success'});
             })
             .catch(err => {
               return Swal2.fire({title: err.message, icon: 'error'});
             })
           },



           async createModel() {
             const values = await Swal2.fire({
               title: 'Create a new controller',
               html: `
                 <input id="swal-name" class="swal2-input" placeholder="Name">
                 <select id="swal-type" class="swal2-input" placeholder="type">
                   <option selected>bare</option>
                   <option>sql</option>
                   <option disabled>mongo</option>
                 </select>
                   <label>
                 <input id="swal-force" type="checkbox" class="swal2-checkbox" placeholder="force" value="true">
                 Force
                 </label>
                 `,
               focusConfirm: false,
               showCancelButton: true,
               reverseButtons: true,
               preConfirm: () => {
                 let values = [
                   document.getElementById('swal-name').value,
                   document.getElementById('swal-type').value,
                   document.getElementById('swal-force').value == 'true',
                 ];
                 values = values.filter(v => v);
                 if (values.length < 3) {
                   return Swal2.fire({title: 'Please fill in all the data', icon: 'error'});
                 }
                 if (values[2] == 'true') {
                   values[2] = true;
                 }
                 return values;
               },

             });
             console.log("values", values)
             this.$http.post('/api/axel-manager/controllers', {name: values.value[0], type: values.value[1], force: values.value[2]})
             .then(() => {
               return Swal2.fire({title: 'Controller successfully created', icon: 'success'});
             })
             .catch(err => {
               return Swal2.fire({title: err.message, icon: 'error'});
             })
           },


           async createRoute() {
             const values = await Swal2.fire({
               title: 'Create a new route',
               html: `
                 <input id="swal-name" class="swal2-input" placeholder="Name">
                `,
               focusConfirm: false,
               showCancelButton: true,
               reverseButtons: true,
               preConfirm: () => {
                 let values = [
                   document.getElementById('swal-name').value,
                 ];
                 values = values.filter(v => v);
                 if (values.length < 1) {
                   return Swal2.fire({title: 'Please fill in all the data', icon: 'error'});
                 }
                 if (values[2] == 'true') {
                   values[2] = true;
                 }
                 return values;
               },

             });
             this.$socket.post('/axel-manager/routes', {body: {name: values.value[0]}})
             .then(() => {
               return Swal2.fire({title: 'Route successfully created', icon: 'success', toast: true});
             })
             .catch(err => {
               return Swal2.fire({title: err.message, icon: 'error'});
             })
           },




           async createApi() {

             if (!this.newApi.name) {
               Swal2.fire({title: 'Missing api name', toast: true});
               return;
             }
             if (!this.newApi.type) {
               Swal2.fire({title: '⚠️ Missing api type', toast: true});
               return;
             }
             if (!this.newApi.fields.length) {
               Swal2.fire({title: '⚠️ Missing api fields', type: 'error', toast: true});
               return;
             }

             if (!this.newApi.fields.filter(f => f.primaryKey).length) {
               Swal2.fire({title: 'You need to define at least one primary key field', toast: true});
               return;
             }


             this.$socket.post('/axel-manager/api', {body: {...this.newApi}})
             .then(() => {
               this.newApi = Object.assign({}, this.newApiTemplate);
               return Swal2.fire({title: 'Api successfully created', icon: 'success', toast: true});

             })
             .catch(err => {
               return Swal2.fire({title: err.message, icon: 'error'});
             })
           },


           async resetModelsAdminConfig() {
             this.$socket.post('/axel-manager/reset-models-config', {body: {...this.newApi}})
             .then(() => {
               return Swal2.fire({title: 'Models successfully resetted', icon: 'success', toast: true});
             })
             .catch(err => {
               return Swal2.fire({title: err.message, icon: 'error'});
             })
           },



         },
       });


         socket.on('hello', (second) => {
           console.log('second', second);
         });
    </script>
  </body>
</html>
