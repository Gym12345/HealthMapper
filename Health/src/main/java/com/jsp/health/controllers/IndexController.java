package com.jsp.health.controllers;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/")
public class IndexController extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Perform any necessary logic here

        // For simplicity, you can directly forward to the JSP page
        // In a real-world scenario, you might want to load data or perform additional processing
        // before forwarding to the JSP page.

        // Forward the request to the main JSP page
        request.getRequestDispatcher("/Health1/Main.jsp").forward(request, response);
    }
}

