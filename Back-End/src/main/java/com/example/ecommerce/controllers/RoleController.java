package com.example.ecommerce.controllers;

import com.example.ecommerce.dtos.RoleDTO;
import com.example.ecommerce.models.Role;
import com.example.ecommerce.responses.ResponseSuccess;
import com.example.ecommerce.services.RoleService;
import com.example.ecommerce.utils.Translator;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/roles")
@RequiredArgsConstructor
public class RoleController {
    private final RoleService roleService;

    @GetMapping("")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ResponseSuccess> getAllRoles(){
        List<Role> roles = roleService.getAllRoles();
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message(Translator.toLocale("role.get_all.success"))
                .status(HttpStatus.OK.value())
                .data(roles)
                .build());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ResponseSuccess> getRoleById(@PathVariable long id){
        Role role = roleService.getRoleById(id);
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message(Translator.toLocale("role.get_by_id.success"))
                .status(HttpStatus.OK.value())
                .data(role)
                .build());
    }

    @PostMapping("")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ResponseSuccess> createRole(@Valid @RequestBody RoleDTO roleDTO){
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message(Translator.toLocale("role.create.success"))
                .status(HttpStatus.CREATED.value())
                .data(roleService.createRole(roleDTO))
                .build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ResponseSuccess> deleteRole(@PathVariable long id){
        roleService.deleteRole(id);
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message(Translator.toLocale("role.delete.success"))
                .status(HttpStatus.NO_CONTENT.value())
                .build());
    }
}
