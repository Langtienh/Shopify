package com.example.ecommerce.controllers;

import com.example.ecommerce.models.Role;
import com.example.ecommerce.responses.ResponseSuccess;
import com.example.ecommerce.services.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/roles")
@RequiredArgsConstructor
public class RoleController {
    private final RoleService roleService;

    @GetMapping("")
    public ResponseEntity<ResponseSuccess> getAllRoles(){
        List<Role> roles = roleService.getAllRoles();
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Get all roles information successfully")
                .status(HttpStatus.OK.value())
                .data(roles)
                .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseSuccess> getRoleById(@PathVariable long id){
        Role role = roleService.getRoleById(id);
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Get brand information successfully")
                .status(HttpStatus.OK.value())
                .data(role)
                .build());
    }
}
