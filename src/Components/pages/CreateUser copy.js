<div className="flex justify-between">
                  <label for="" className="text-xs font-semibold px-1">Password</label>
                  <p className={"inputcolor text-xs italic ml-1 " + (passvalid ? "visible" : "invisible")}>password required</p>
                </div>
                <div className="flex">
                  <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <input
                    password="password"
                    className={"w-full -ml-10 pl-10 pr-3 py-1 rounded border-2 border-gray-200 outline-none focus:border-indigo-500 " + (passvalid ? "border bordercolor" : "border border-gray-light")}
                    name="password"
                    placeholder="Password"
                    value={password}
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{6,20}$"
                    onChange={handlePassword}
                  />
></div>


<div className="flex -mx-3">
              <div className="w-full px-3 mb-5">
                <div className="flex justify-between">
                  <label for="" className="text-xs font-semibold px-1">Email</label>
                  <p className={"inputcolor text-xs italic ml-1 " + (companynamevalid ? "visible" : "invisible")}>Companyname required</p>

                </div>
                <div className="flex">
                  <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    className={"w-full -ml-10 pl-10 pr-3 py-1 rounded border-2 border-gray-200 outline-none focus:border-indigo-500 " + (companynamevalid ? "border bordercolor" : "border border-gray-light")}
                    name="Company Name"
                    placeholder="Company Name"
                    value={companyname}
                    onChange={handlecompanyName}
                  >
                  </input>
                </div>
              </div>
            </div>