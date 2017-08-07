using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BettingCalculator.Web.Controllers
{
    public class BetCalculatorController : Controller
    {
        // GET: BetCalculator
        public ActionResult Index()
        {
            return View();
        }

        // GET: BetCalculator/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: BetCalculator/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: BetCalculator/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: BetCalculator/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: BetCalculator/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: BetCalculator/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: BetCalculator/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
