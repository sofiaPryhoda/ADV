package com.company.controller;

import com.company.dto.UserDTO;
import com.company.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> all() {
        return ResponseEntity.ok(userService.read());
    }

    @GetMapping("/asc")
    public ResponseEntity<List<UserDTO>> byNameASC() {
        return ResponseEntity.ok(userService.sortByNameASC());
    }

    @GetMapping("/desk")
    public ResponseEntity<List<UserDTO>> byNameDESK() {
        return ResponseEntity.ok(userService.sortByNameDESK());
    }
//desc instead of desk
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> findById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(userService.getById(id));
    }

    @PostMapping("/add")
    public ResponseEntity<UserDTO> add(@RequestBody UserDTO userDTO) {
        return ResponseEntity.ok().body(userService.create(userDTO));
    }

    @PutMapping("/update")
    public ResponseEntity<String> update(@RequestBody UserDTO userDTO) {
        userService.update(userDTO);
        return ResponseEntity.ok().body("User was updated successfully");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") Long id) {
        userService.delete(id);
        return ResponseEntity.ok().body("User was deleted successfully");
    }
}